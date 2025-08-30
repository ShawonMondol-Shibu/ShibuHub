"use client";
import { Header } from "@/components/layout/Header";
import Product, { cardType } from "@/components/layout/Product";
import { useQuery } from "@tanstack/react-query";
interface ApiResponse {
  products: cardType[];
}

export default function Home() {
  const getData = async () => {
    const res = await fetch("https://fakestoreapi.in/api/products");
    return res.json();
  };

  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ["products"],
    queryFn: getData,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  console.log(data?.products);
  return (
    <main>
      <Header data={data?.products} />
      <section className="container m-auto grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-20 px-5 mt-10">
        {!data?.products == null ? (
          <h2 className="text-5xl font-semibold w-fit">Product is not found</h2>
        ) : (
          data?.products.slice(0, 8).map((item: cardType) => {
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
