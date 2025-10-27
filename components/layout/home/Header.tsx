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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type carouselType = {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
  discount: number;
};

type HeaderProps = {
  headerData: carouselType[];
};

export function Header({ headerData }: HeaderProps) {
  return (
    <header className="h-[calc(100dvh-64px)] relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
      <Carousel className="container mx-auto relative z-10">
        <CarouselContent>
          {headerData?.slice(0, 5).map((item: carouselType) => {
            const { id, image, title, price, category, description, discount } =
              item;
            return (
              <CarouselItem key={id}>
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="grid lg:grid-cols-2 grid-cols-1 items-center gap-8 lg:gap-16 py-12 lg:py-20 px-6">
                    <div className="relative group order-2 lg:order-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                      <div className="relative w-fit m-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-indigo-100">
                        <Image
                          src={
                            image ||
                            "/placeholder.svg?height=400&width=400&query=modern+electronic+device"
                          }
                          width={400}
                          height={400}
                          alt={title}
                          className=" h-auto object-contain drop-shadow-2xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-6 order-1 lg:order-2 text-center lg:text-left">
                      <div className="space-y-3">
                        <Badge
                          variant="secondary"
                          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                        >
                          {category}
                        </Badge>
                        <CardTitle className="text-3xl lg:text-5xl line-clamp-2 xl:text-6xl font-bold text-indigo-950 leading-tight">
                          {title}
                        </CardTitle>
                      </div>

                      <p className="text-lg text-gray-600 line-clamp-3 leading-relaxed max-w-xl">
                        {description}
                      </p>

                      <div className="space-y-4">
                        {discount > 0 && (
                          <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <span className="text-sm text-gray-500">Was:</span>
                            <del className="text-xl font-semibold text-red-500">
                              ${discount}
                            </del>
                            <Badge variant="destructive" className="text-xs">
                              SAVE ${discount - price}
                            </Badge>
                          </div>
                        )}

                        <div className="flex items-center gap-6 justify-center lg:justify-start flex-wrap">
                          <span className="text-4xl font-bold text-indigo-600">
                            ${price}
                          </span>
                          <Button
                            size="lg"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            asChild
                          >
                            <Link href={`/products/${id}`}>Get It Now</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="flex justify-center  gap-4">
          <CarouselPrevious className="relative translate-y-0 left-0 bg-white/80 backdrop-blur-sm border-indigo-200 hover:bg-indigo-50" />
          <CarouselNext className="relative translate-y-0 right-0 bg-white/80 backdrop-blur-sm border-indigo-200 hover:bg-indigo-50" />
        </div>
      </Carousel>
    </header>
  );
}
