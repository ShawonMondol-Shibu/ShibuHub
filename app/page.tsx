"use client";
import { Header } from "@/components/layout/Header";
import Product from "@/components/layout/Product";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.in/api/products")
      .then((res) => res.json())
      .then((res) => setItems(res.products));
  }, []);
  console.log(items);
  return (
    <main>
      <Header data={items}/>
      <section className="container m-auto grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-20 px-5 mt-10">
        {!items == null ? (
          <h2 className="text-5xl font-semibold w-fit">Product is not found</h2>
        ) : (
          items.map((item) => {
            const { id, image, title, description, price } = item;
            return (
              <Product
                key={id}
                id={id}
                image={image}
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
