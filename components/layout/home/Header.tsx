import * as React from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type carouselType = {
  id: number;
  image: string;
  title: string;
  model: string;
  description: string;
  price: number;
  discount: number;
};

type HeaderProps = {
  headerData: carouselType[];
};

export function Header({ headerData }: HeaderProps) {
  return (
    <header className="shadow">
      <Carousel className="container m-auto">
        <CarouselContent className="bg-neutral-100">
          {headerData.slice(0, 5).map((item: carouselType) => {
            const { id, image, title, price, model, description, discount } =
              item;
            return (
              <CarouselItem key={id}>
                <Card className="shadow-none border-none relative">
                  <i className="w-10/12 h-5 bg-indigo-800 blur-3xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-colors duration-300 ease-out"></i>
                  <div className="z-30">
                    <CardContent className="grid grid-cols-2 items-center justify-center gap-10">
                      <Image
                        src={image || "/images/image.png"}
                        width={500}
                        height={500}
                        alt={title}
                        className="m-auto"
                      />
                      <hgroup className="space-y-5 w-xl m-auto text-wrap">
                        <CardTitle className="lg:text-5xl text-indigo-950 font-bold leading-16 line-clamp-2">
                          {title}
                        </CardTitle>
                        <p className="font-bold text-indigo-950">{model}</p>
                        <p className="line-clamp-3 text-lg text-neutral-700">
                          {description}
                        </p>
                        <p>
                          <del className="text-xl font-bold text-red-500">
                            {" "}
                            Discount $ {discount}
                          </del>
                        </p>
                        <span className="flex items-center gap-5">
                          <p className="text-xl font-bold">$ {price}</p>

                          <Button
                            variant={"default"}
                            size={"lg"}
                            className="size-12 px-20 bg-indigo-500 text-white shadow-2xl"
                            asChild
                          >
                            <Link href={`/${id}`}>Get It now</Link>
                          </Button>
                        </span>
                      </hgroup>
                    </CardContent>
                  </div>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {/* <span className="flex absolute bottom-0 left-[50%]"> */}
        {/*<CarouselPrevious />
        <CarouselNext />*/}
        {/* </span> */}
      </Carousel>
    </header>
  );
}
