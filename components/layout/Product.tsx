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
      <CardContent>
        <CardTitle>{title.slice(0, 10)}</CardTitle>
        <p>$ {price}</p>
        <p>{description.slice(0, 50)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/:${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
