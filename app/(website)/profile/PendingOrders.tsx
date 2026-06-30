"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Timer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function PendingOrders() {
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const pendingOrders = orders.filter(
    (order: { status: string }) =>
      order.status === "pending" || order.status === "processing"
  );

  return (
    <main className="space-y-4 border p-5 rounded-lg">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Pending Orders</CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-2">
        {pendingOrders.length === 0 ? (
          <Item variant={"outline"}>
            <ItemContent>
              <ItemTitle>Empty Pending Orders</ItemTitle>
            </ItemContent>
          </Item>
        ) : (
          pendingOrders.map((order: { id: string }) => (
            <Item
              key={order.id}
              variant={"outline"}
              className="bg-muted border-border"
            >
              <ItemMedia>
                <Timer
                  size={18}
                  stroke="darkorange"
                  className="drop-shadow drop-shadow-orange-300"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  Order #{order.id.slice(0, 8)} is pending
                </ItemTitle>
              </ItemContent>
            </Item>
          ))
        )}
      </div>
    </main>
  );
}
