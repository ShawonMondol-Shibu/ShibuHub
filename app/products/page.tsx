"use client";
import Product, { cardType } from "@/components/layout/Product";
import { getData } from "@/components/provider/Provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

export default function Page() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="py-40">
      <span className=" w-10/12 m-auto flex items-center justify-center gap-4">
        <Input className="" />
        <Button variant={"outline"} size={"icon"}>
          <Search />
        </Button>
      </span>

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
