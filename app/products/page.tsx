"use client";
import Product, { cardType } from "@/components/layout/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [category, setCategory] = useState("mobile");
  const getData = async () => {
    const res = await fetch(
      `https://fakestoreapi.in/api/products/category?type=${category}`,
    );
    return res.json();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", category],
    queryFn: getData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  const categorys = ["tv", "audio", "laptop", "mobile", "gaming", "appliances"];
  const handleCategory = (e) => {
    e.preventDefault();
    const categoryBlue = e.currentTarget.value;
    setCategory(categoryBlue);
    console.log(categoryBlue);
  };

  return (
    <div className="my-10">
      <section className="container m-auto px-5 space-y-5">
        <span className="flex items-center justify-center gap-4">
          <Input placeholder="Search favourite product" />
          <Button variant={"outline"} size={"icon"}>
            <Search />
          </Button>
        </span>
        <span className="flex flex-wrap items-center gap-5">
          {categorys.map((category) => (
            <Button
              key={category}
              variant={"outline"}
              value={category}
              onClick={handleCategory}
            >
              {category}
            </Button>
          ))}
        </span>
      </section>

      <section className="container m-auto grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-20 px-5 mt-10">
        {!data?.products || data?.products.length === 0 ? (
          <h2 className="text-5xl font-semibold w-fit">Product not found</h2>
        ) : (
          data.products.map((item: cardType) => {
            const { id, image, title, description, price } = item;
            return (
              <Product
                key={id}
                id={id}
                image={image?.trim()}
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
