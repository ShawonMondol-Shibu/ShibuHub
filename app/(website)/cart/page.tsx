"use client";
import { userContext } from "@/components/context/contextProvider";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";

interface cartItemType {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export default function Page() {
  const { carts, handleQuantity, handleRemove } = useContext(userContext);

  return (
    <main className="container m-auto px-5">
      <DynamicBreadcrumb />
      <section>
        {carts.length === 0 ? (
          <p>There are no carts</p>
        ) : (
          carts.map((item: cartItemType) => (
            <Card key={item.id} className="w-full my-2">
              <CardContent className="flex items-center justify-between gap-5">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="w-12 h-12"
                />
                <CardTitle className="flex-1">{item.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus />
                  </Button>
                </div>
                <span>
                  <b>${(item.price * item.quantity).toFixed(2)}</b>
                </span>
                <Button
                  variant="destructive"
                  size="icon"
                  title="remove the product"
                  onClick={() => handleRemove(item.id)}
                >
                  <Trash2 />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </main>
  );
}
