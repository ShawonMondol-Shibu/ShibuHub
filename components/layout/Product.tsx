import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Heart } from "lucide-react";

export interface cardType {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}

export default function Product({
  image,
  title,
  description,
  id,
  price,
}: cardType) {
  return (
    <Card className="w-full max-w-max hover:shadow-lg hover:scale-105 ease-in transition-all duration-300 m-auto group relative">
      <i className="w-10/12 h-20 group-hover:bg-indigo-500 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-colors duration-300 ease-out"></i>
      <div className="z-10 backdrop-blur-3xl">
        <CardHeader className="relative flex flex-col  items-center justify-center h-80">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={(e) => {
              e.currentTarget.style.fill = "red";
              e.currentTarget.style.stroke = "red";
            }}
            asChild
            className="size-5 absolute top-0 right-5"
          >
            <Heart />
          </Button>
          <Image
            width={300}
            height={300}
            src={image || "/images/image.png"}
            alt={title}
            className="m-auto mix-blend-lighten"
          />
        </CardHeader>
        <CardContent className="space-y-1 z-50">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <p className="text-base font-semibold">$ {price} </p>
          <p className="text-sm line-clamp-2 text-neutral-500">{description}</p>
        </CardContent>
        <CardFooter>
          <Button
            variant={"outline"}
            asChild
            className="dark:hover:bg-indigo-500 hover:bg-indigo-500  border-none hover:shadow-xl hover:shadow-indigo-500 hover:text-white"
          >
            <Link href={`/${id}`}>Buy Now</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
