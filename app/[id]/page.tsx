import { CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
type ProductType = {
  image: string;
  title: string;
  price: number;
  model?: string;
  description: string;
};

export default async function Page({ params }: { params: { id: string } }) {
  let item;
  try {
    const res = await fetch(
      `https://fakestoreapi.in/api/products/${params.id}`
    );
    const data = await res.json();
    item = data.product as ProductType;
  } catch (error) {
    console.error("Fetch error:", error);
    return <p>Failed to load product.</p>;
  }

  if (!item) {
    return <p>Product not found or failed to load.</p>;
  }

  const { image, title, price, model, description } = item;
  console.log(item);
  return (
    <main>
      <section className="flex items-center">
        <Image
          src={image || "/images/image.png"}
          alt={title}
          width={500}
          height={500}
        />
        <div>
          <hgroup className="space-y-4 m-auto w-lg">
            <CardTitle className="text-xl">{title}</CardTitle>
            <p>{model}</p>
            <p className="text-xl font-bold">$ {price}</p>
            <p className="text-lg">{description}</p>
          </hgroup>
        </div>
      </section>
    </main>
  );
}
