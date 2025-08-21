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
    <Card className="w-full max-w-max hover:shadow-lg hover:scale-105 ease-in-out transition-all duration-300 m-auto">
      <CardHeader>
        <Image
          width={300}
          height={300}
          src={image || "/images/image.png"}
          alt={title}
          className="rounded-2xl w-full"
        />
      </CardHeader>
      <CardContent className="space-y-2">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <p className="text-base font-semibold">$ {price} </p>
        <p className="text-sm line-clamp-2 text-neutral-500">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
