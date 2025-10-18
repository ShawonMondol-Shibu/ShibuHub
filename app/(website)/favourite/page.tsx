"use client";
import { userContext } from "@/components/context/contextProvider";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "sonner";

interface favouriteType {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function Page() {
  const { carts, hearts, handleRemoveHeart } = useContext(userContext);
  const router = useRouter();
  const handleBuy = (id: number) => {
    const isInCart = carts.find((item) => item.id === id);
    if (isInCart) {
      toast.error("Item is already in the cart");
    } else {
      router.push(`/${id}`);
    }
  };

  return (
    <main className="container m-auto ">
      <DynamicBreadcrumb />
      <section className="my-10">
        {hearts.length > 0 ? (
          <ul className="space-y-2">
            {hearts.map((item: favouriteType) => (
              <li key={item.id}>
                <Card className="w-full">
                  <CardContent className="flex items-center justify-between gap-5">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt="product image"
                      width={500}
                      height={500}
                      className="w-12 h-12"
                    />
                    <CardTitle>{item.title}</CardTitle>
                    <span>price: ${item.price} </span>
                    <Button
                      variant={"outline"}
                      onClick={() => handleBuy(item.id)}
                    >
                      Buy Again
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      title="remove the product"
                      onClick={() => handleRemoveHeart(item.id)}
                    >
                      <Trash2
                        className={cn(
                          "size-5 drop-shadow-sm drop-shadow-red-300 stroke-red-500"
                        )}
                      />
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favourites found.</p>
        )}
      </section>
    </main>
  );
}
