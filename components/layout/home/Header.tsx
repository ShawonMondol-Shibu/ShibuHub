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
import { Button } from "@/components/ui/button";


type carouselType = {
  id: number;
  image: string;
  title: string;
  model: string;
  description: string;
  price: number;
};

type HeaderProps = {
  headerData: carouselType[];
};

export function Header({ headerData }: HeaderProps) {
  return (
    <Carousel className="w-full max-w-max">
      <CarouselContent className="bg-neutral-100">
        {headerData.slice(0, 5).map((item: carouselType) => {
          const { id, image, title, price, model, description } = item;
          return (
            <CarouselItem key={id}>
              <div>
                <Card className="border-none shadow-none">
                  <CardContent className="flex gap-10 items-center justify-center">
                    <Image
                      src={image || "/images/image.png"}
                      width={500}
                      height={500}
                      alt={title}
                      className="m-auto basis-1/3"
                    />
                    <hgroup className="space-y-4 w-xl m-auto basis-1/3">
                      <CardTitle className="text-4xl">{title}</CardTitle>
                      <p>{model}</p>
                      <p className="line-clamp-2 text-lg">{description}</p>
                      <span className="flex items-center">
                        <p className="text-xl font-bold">$ {price}</p>

                        <Button
                          variant={"outline"}
                          size={"lg"}
                          className="size-12 px-20"
                        >
                          Get It now
                        </Button>
                      </span>
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
