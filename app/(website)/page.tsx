"use client";
import { Header } from "@/components/layout/home/Header";
import { LicenseSection } from "@/components/layout/home/License-section";
import OurProducts from "@/components/layout/home/OurProducts";
import Services from "@/components/layout/home/Services";
import { getData } from "@/components/provider/Provider";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-lg text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600">{(error as Error).message}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );

  console.log(data);
  return (
    <main>
      <Header headerData={data} />
      <OurProducts productsData={data} />
      <Services />
      <LicenseSection />
    </main>
  );
}
