import { Button } from "@/components/ui/button";
import { Card,  CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Timer } from "lucide-react";
import React from "react";

export default function PendingOrders() {
  const data = [1, 2, 3];
  return (
    <main className="space-y-5 border p-5 rounded-lg">
      <Card className="bg-yellow-500 text-white">
        <CardHeader>
          <CardTitle >Pendign Orders</CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-2">
        {data.length === 0 ? (
          <Item variant={"outline"}>
            <ItemContent>
              <ItemTitle>Empty Pending Orders</ItemTitle>
            </ItemContent>
          </Item>
        ) : (
          data.map((item) => (
            <Item key={item} variant={"outline"} className="bg-orange-50 border-orange-200">
              <ItemMedia>
                <Timer
                  size={18}
                  stroke="darkorange"
                  className="drop-shadow drop-shadow-orange-300"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Order #{item} is pending</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button variant={"outline"} size={"sm"}>
                  Cancel
                </Button>
              </ItemActions>
            </Item>
          ))
        )}
      </div>
    </main>
  );
}
