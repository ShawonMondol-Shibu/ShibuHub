import * as React from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type carouselType = {
  id: number;
  image: string;
  title: string;
  model: string;
  description: string;
  price: number;
};

type HeaderProps = {
  data: carouselType[];
};

export function Header({ data }: HeaderProps) {
  return (
    <Carousel className="w-full max-w-max">
      <CarouselContent className="bg-neutral-100">
        {data.slice(0, 5).map((item: carouselType) => {
          const { id, image, title, price, model, description } = item;
          return (
            <CarouselItem key={id}>
              <div className="p-5">
                <Card className="border-none shadow-none">
                  <CardContent className="grid grid-cols-2 gap-10 items-center">
                    <Image
                      src={image || "/images/image.png"}
                      width={500}
                      height={500}
                      alt={title}
                      className="m-auto"
                    />
                    <hgroup className="space-y-4 m-auto w-lg">
                      <CardTitle className="text-xl">{title}</CardTitle>
                      <p>{model}</p>
                      <p className="text-xl font-bold">$ {price}</p>
                      <p className="line-clamp-2 text-lg">{description}</p>
                    </hgroup>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <span className="flex absolute bottom-0 left-[50%]">
        <CarouselPrevious />
        <CarouselNext />
      </span>
    </Carousel>
  );
}
