/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { getData } from "@/components/provider/Provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface favouriteType {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity?: number;
  description:string;
}

export default function Page() {
  const [favourite, setFavourites] = useState<favouriteType[]>([]);

  const { data, isPending } = useQuery({
    queryKey: ["item"],
    queryFn: getData,
  });

  useEffect(() => {
    try {
      const store = localStorage.getItem("favourites");
      if (store && !isPending && data) {
        const parseStore = JSON.parse(store) as { id: number }[];
        const ids = parseStore.map((item) => item.id);

        const filterData = data.filter((item: favouriteType) =>
          ids.includes(item.id)
        );

        const withQty = filterData.map((item: any) => ({
          ...item,
          quantity: 1,
        }));

        setFavourites(withQty);
      }
    } catch {
      setFavourites([]);
    }
  }, [data, isPending]);


  const handleRemove = (id: number) => {
    setFavourites((prev) => prev.filter((item) => item.id !== id));
    // localStorage sync
    const store = localStorage.getItem("favourites");
    if (store) {
      const parseStore = JSON.parse(store).filter((item: { id: number }) => item.id !== id);
      localStorage.setItem("favourites", JSON.stringify(parseStore));
    }
  };

  return (
    <main className="container m-auto ">
      <DynamicBreadcrumb />
      <section className="my-10">
        {favourite.length > 0 ? (
          <ul className="space-y-2">
            {favourite.map((item) => (
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
                    <CardDescription>{item.description}</CardDescription>
                    <span>price: ${item.price} </span>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      title="remove the product"
                      onClick={() => handleRemove(item.id)}
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
