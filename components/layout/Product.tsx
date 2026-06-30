"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useContext } from "react";
import { cn } from "@/lib/utils";
import { userContext } from "../context/contextProvider";

export interface cardType {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function Product({
  image,
  title,
  description,
  id,
  price,
}: cardType) {
  const { hearts, handleHeart } = useContext(userContext);
  const isHeart = hearts.find((heart: { id: number }) => heart.id === id);

  return (
    <Card className="w-full max-w-md hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 m-auto group overflow-hidden border-border">
      <div className="relative overflow-hidden">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => handleHeart(id, image, title, price)}
          className="size-8 rounded-full absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={cn(
              "size-4 transition-all duration-200",
              isHeart
                ? "fill-red-500 stroke-red-500"
                : "stroke-2 group-hover:scale-110"
            )}
          />
        </Button>
        <CardHeader className="flex flex-col items-center justify-center h-56 bg-muted/50 rounded-t-xl overflow-hidden p-4">
          <div className="w-32 h-32 relative group-hover:scale-105 transition-transform duration-500 ease-out">
            <Image
              width={300}
              height={300}
              src={image || "/images/image.png"}
              alt={title}
              className="m-auto object-contain"
            />
          </div>
        </CardHeader>
      </div>
      <CardContent className="pt-4 pb-2 px-4">
        <h3 className="font-semibold text-sm line-clamp-1 text-foreground">{title}</h3>
        <p className="text-lg font-bold text-primary mt-1">${price}</p>
        <p className="text-xs line-clamp-2 text-muted-foreground mt-1">{description}</p>
      </CardContent>
      <CardFooter className="pb-4 px-4">
        <Button variant="default" asChild className="w-full text-sm">
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}