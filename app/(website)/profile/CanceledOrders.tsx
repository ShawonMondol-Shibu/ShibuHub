import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item";
import { XCircle } from "lucide-react";
import React from "react";

export default function CanceledOrders() {
  const data = [1, 2, 3];
  return (
    <main className="space-y-5 p-5 border rounded-lg">
      <Card className="bg-rose-500 text-white">
        <CardHeader>
          <CardTitle >Canceled Orders</CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-2">
        {data.length === 0 ? (
          <Item variant={"outline"}>
            <ItemContent>
              <ItemTitle>Empty Canceled Orders</ItemTitle>
            </ItemContent>
          </Item>
        ) : (
          data.map((item) => (
            <Item
              key={item}
              variant={"outline"}
              className="bg-rose-50 border-rose-200"
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
                <ItemTitle>Order #{item} is Canceled</ItemTitle>
              </ItemContent>
            </Item>
          ))
        )}
      </div>
    </main>
  );
}
