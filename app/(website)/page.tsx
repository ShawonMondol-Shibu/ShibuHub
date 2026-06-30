"use client";
import { Header } from "@/components/layout/home/Header";
import { LicenseSection } from "@/components/layout/home/License-section";
import OurProducts from "@/components/layout/home/OurProducts";
import Services from "@/components/layout/home/Services";
import { getData } from "@/components/provider/Provider";
import { useQuery } from "@tanstack/react-query";
import { LoadingPage, ErrorPage } from "@/components/shared";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage message={(error as Error).message} onRetry={() => window.location.reload()} />;

  return (
    <main>
      <Header headerData={data} />
      <OurProducts productsData={data} />
      <Services />
      <LicenseSection />
    </main>
  );
}
