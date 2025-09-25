"use client";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { getData } from "@/components/provider/Provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface cartType {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function Page() {
  const [Cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState<number>(1);

  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: ["items"],
    queryFn: getData,
  });

  useEffect(() => {
    const store = localStorage.getItem("cart");
    if (store && !isPending && data) {
      const storeData = JSON.parse(store).map((item: string) => parseInt(item));
      const cartItem = data.filter((item: cartType) =>
        storeData.includes(item.id)
      );
      // console.log(cartItem)
      setCart(cartItem);
    }
  }, [data, isPending]);

  console.log(Cart);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    setQuantity(quantity - 1);
  };

  if (isLoading) {
    return <p>Cart Product is loading</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <main className="container m-auto px-5">
      <DynamicBreadcrumb />
      <section>
        {Cart.map((item: cartType) => (
          <Card key={item.id} className="w-full">
            <CardContent className="flex items-center justify-between gap-5">
              <Image
                src={item.image || "/placeholder.svg"}
                alt="product image"
                width={500}
                height={500}
                className="w-12 h-12"
              />
              <CardTitle>{item.title || "Product Title"}</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={handlePlus}
                  className="cursor-pointer hover:bg-primary hover:text-indigo-50 transition-colors duration-300 ease-out"
                >
                  <Plus />{" "}
                </Button>
                <span>{quantity || "1"}</span>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={handleMinus}
                  className="cursor-pointer hover:bg-primary hover:text-indigo-50 transition-colors duration-300 ease-out"
                >
                  <Minus />{" "}
                </Button>
              </div>
              <span>
                <small>
                  <b>$</b>
                </small>
                {(item.price * quantity).toFixed(2) || "100"}
              </span>
              <Button
                variant={"default"}
                size={"icon"}
                title="remove the product"
              >
                <Trash2 />
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
