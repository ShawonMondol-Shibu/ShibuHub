"use client";
import { userContext } from "@/components/context/contextProvider";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

interface favouriteType {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function Page() {
  const { hearts, handleRemoveHeart } = useContext(userContext);

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
                    <Button variant={"outline"}>
                      <Link href={`/${item.id}`}>Buy Again</Link>
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      title="remove the product"
                      onClick={() => handleRemoveHeart(item.id)}
                    >
                      <Trash2 />
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
