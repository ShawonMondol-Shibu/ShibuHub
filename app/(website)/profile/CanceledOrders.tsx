"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item";
import { XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function CanceledOrders() {
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const canceledOrders = orders.filter(
    (order: { status: string }) => order.status === "cancelled"
  );

  return (
    <main className="space-y-5 p-5 border rounded-lg">
      <Card className="bg-destructive text-destructive-foreground">
        <CardHeader>
          <CardTitle>Canceled Orders</CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-2">
        {canceledOrders.length === 0 ? (
          <Item variant={"outline"}>
            <ItemContent>
              <ItemTitle>Empty Canceled Orders</ItemTitle>
            </ItemContent>
          </Item>
        ) : (
          canceledOrders.map((order: { id: string }) => (
            <Item
              key={order.id}
              variant={"outline"}
              className="bg-muted border-border"
            >
              <ItemMedia>
                <XCircle
                  size={18}
                  fill="red"
                  stroke="white"
                  className="drop-shadow-md"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  Order #{order.id.slice(0, 8)} is Canceled
                </ItemTitle>
              </ItemContent>
            </Item>
          ))
        )}
      </div>
    </main>
  );
}
