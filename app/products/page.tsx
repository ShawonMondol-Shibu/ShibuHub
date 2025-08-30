"use client";
import Product, { cardType } from "@/components/layout/Product";
import { getData } from "@/components/provider/Provider";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";

export default function page() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });
  if (isLoading) return <Suspense fallback={""}></Suspense>;
  if (isError) return <p>Error: {error.message}</p>;
  console.log(data?.products);
  return (
    <div>
      <section className="container m-auto grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-20 px-5 mt-10">
        {!data?.products == null ? (
          <h2 className="text-5xl font-semibold w-fit">Product is not found</h2>
        ) : (
          data?.products.map((item: cardType) => {
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
    </div>
  );
}
