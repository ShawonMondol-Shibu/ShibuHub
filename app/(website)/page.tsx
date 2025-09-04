"use client";
import { Header } from "@/components/layout/home/Header";
import { LicenseSection } from "@/components/layout/home/License-section";
import OurProducts from "@/components/layout/home/OurProducts";
import Services from "@/components/layout/home/Services";
import { getData } from "@/components/provider/Provider";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });
  if (isLoading) return <Suspense fallback={""}></Suspense>;
  if (isError) return <p>Error: {error.message}</p>;
  console.log(data?.products);
  return (
    <main>
      <Header headerData={data?.products} />
      <OurProducts productsData={data?.products} />
      <Services />
      <LicenseSection />
    </main>
  );
}
