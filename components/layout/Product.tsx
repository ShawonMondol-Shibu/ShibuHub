"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
  const isHeart = hearts.find((item: number) => item === id);

  // const [favourites, setFavourites] = useState<
  //   { id: number; heart: boolean }[]
  // >([]);

  // useEffect(() => {
  //   const stored = localStorage.getItem("favourites");
  //   if (stored) {
  //     setFavourites(JSON.parse(stored));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (favourites.length > 0) {
  //     localStorage.setItem("favourites", JSON.stringify(favourites));
  //   }
  // }, [favourites]);

  // const isFav = favourites.some((f) => f.id === id);

  // const handleFavourite = () => {
  //   let updated;
  //   if (isFav) {
  //     // remove from favourites
  //     updated = favourites.filter((f) => f.id !== id);
  //     toast.success("Remove to Favourite Successfully.");
  //   } else {
  //     // add to favourites
  //     updated = [...favourites, { id, heart: true }];
  //     toast.success("Add to Favourite Successfully.");
  //   }
  //   setFavourites(updated);
  // };

  return (
    <Card className=" w-full max-w-md hover:shadow-2xl shadow-indigo-300 hover:scale-105 ease-in transition-all duration-200 m-auto group relative">
      <i className="w-10/12 h-20 group-hover:bg-indigo-500 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-colors duration-200 ease-out"></i>
      <div className="z-10 backdrop-blur-3xl">
        <CardHeader className="relative flex flex-col items-center justify-center h-80">
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={() => handleHeart(id)}
            className="size-9 rounded-full absolute top-0 right-5 z-50"
          >
            <Heart
              className={cn(
                "size-5",
                isHeart
                  ? "drop-shadow-sm drop-shadow-red-500 fill-red-500 stroke-red-500"
                  : "stroke-2",
              )}
            />
          </Button>
          <div className="w-48">
            <Image
              width={300}
              height={300}
              src={image || "/images/image.png"}
              alt={title}
              className="m-auto object-cover mix-blend-lighten drop-shadow-xl drop-shadow-zinc-300"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-1 z-50">
          <CardTitle id="title" className="line-clamp-1">
            {title}
          </CardTitle>
          <p className="text-base font-semibold">$ {price} </p>
          <p className="text-sm line-clamp-2 text-neutral-500">{description}</p>
        </CardContent>
        <CardFooter>
          <Button
            variant={"outline"}
            asChild
            className="mt-2 group-hover:bg-indigo-500 bg-indigo-500 hover:bg-indigo-500 border-none group-hover:shadow-xl group-hover:shadow-indigo-500 hover:text-white text-white"
          >
            <Link href={`/${id}`}>Buy Now</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
