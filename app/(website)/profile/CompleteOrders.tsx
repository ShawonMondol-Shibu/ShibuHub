"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { CheckCircle2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function CompleteOrders() {
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const completedOrders = orders.filter(
    (order: { status: string }) => order.status === "delivered"
  );

  return (
    <main
      className="space-y-5 p-5 border rounded-lg"
      aria-label="Completed Orders Section"
    >
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Completed Orders</CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-2">
        {completedOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <CheckCircle2Icon className="mx-auto mb-2 text-gray-300" />
            <p>No completed orders yet.</p>
          </div>
        ) : (
          completedOrders.map((order: { id: string }) => (
            <Item
              key={order.id}
              variant={"outline"}
              className="bg-muted border-border"
            >
              <ItemMedia>
                <CheckCircle2Icon className="text-green-600" size={18} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Order #{order.id.slice(0, 8)} is Completed</ItemTitle>
              </ItemContent>
            </Item>
          ))
        )}
      </div>
    </main>
  );
}
