"use client";
import { userContext } from "@/components/context/contextProvider";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { getData } from "@/components/provider/Provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

interface cartItemType {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export default function Page() {
  const [Cart, setCart] = useState<cartItemType[]>([]);
  const { setCarts } = useContext(userContext);

  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: ["items"],
    queryFn: getData,
  });

  // Load cart from localStorage
  useEffect(() => {
    const store = localStorage.getItem("cart");
    if (store && !isPending && data) {
      const storeData = JSON.parse(store); // [{id, quantity}]
      const cartItem = data
        .filter((item: cartItemType) =>
          storeData.some((s: { id: number }) => s.id === item.id),
        )
        .map((item: cartItemType) => {
          const stored = storeData.find(
            (s: { id: number }) => s.id === item.id,
          );
          return { ...item, quantity: stored.quantity || 1 };
        });

      setCart(cartItem);
    }
  }, [data, isPending]);

  // Update localStorage whenever Cart changes
  useEffect(() => {
    if (Cart.length > 0) {
      const cartStore = Cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(cartStore));
    }
  }, [Cart]);

  const handlePlus = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleMinus = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemove = (id: number) => {
    const updated = Cart.filter((item) => item.id !== id);
    setCarts(updated.length);
    setCart(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updated.map((item) => ({ id: item.id, quantity: item.quantity })),
      ),
    );
  };

  if (isLoading) return <p>Cart Product is loading...</p>;
  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <main className="container m-auto px-5">
      <DynamicBreadcrumb />
      <section>
        {Cart.length === 0 ? (
          <p>There are no carts</p>
        ) : (
          Cart.map((item) => (
            <Card key={item.id} className="w-full my-2">
              <CardContent className="flex items-center justify-between gap-5">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt="product image"
                  width={500}
                  height={500}
                  className="w-12 h-12"
                />
                <CardTitle className="flex-1">{item.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMinus(item.id)}
                  >
                    <Minus />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePlus(item.id)}
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
