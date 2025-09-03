import React from "react";
import Product, { cardType } from "../Product";
import { CardTitle } from "@/components/ui/card";
interface productsDataType {
  productsData: cardType[];
}

export default function OurProducts({ productsData }: productsDataType) {
  return (
    <main className="mt-60">
      <section>
        <CardTitle className="text-5xl text-center">Our Products</CardTitle>
      </section>
      <section className="container m-auto grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-20 px-5 mt-20">
        {!productsData == null ? (
          <h2 className="text-5xl font-semibold w-fit">Product is not found</h2>
        ) : (
          productsData.slice(0, 8).map((item: cardType) => {
            const { id, image, title, description, price } = item;
            return (
              <Product
                key={id}
                id={id}
                image={image.trim()}
                title={title}
                description={description}
                price={price}
              />
            );
          })
        )}
      </section>
    </main>
  );
}
