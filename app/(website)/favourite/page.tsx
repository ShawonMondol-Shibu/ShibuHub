"use client";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { getData } from "@/components/provider/Provider";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [favourite, setFavourites] = useState<any[]>([]);

  const { data, isPending } = useQuery({
    queryKey: ["item"],
    queryFn: getData,
  });

  useEffect(() => {
    const store = localStorage.getItem("favourites");

    try {
      if (store && !isPending) {
        const parseStore = JSON.parse(store);
        const ids = parseStore.map((item: { id: number }) => item.id);

        console.log(ids);
        const filterData = data.filter((item:{id:number,title:string, image:string}, i:number) => item.id === ids[i]);
        setFavourites(filterData);
      }
    } catch {
      setFavourites([]);
    }
  }, [data]);

  console.log(favourite);

  return (
    <main className="container m-auto">
      <DynamicBreadcrumb />
      <section>
        {favourite.length > 0 ? (
          <ul>
            {favourite.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        ) : (
          <p>No favourites found.</p>
        )}
      </section>
    </main>
  );
}
