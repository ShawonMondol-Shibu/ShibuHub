"use client";
import Product, { type cardType } from "@/components/layout/Product";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [category, setCategory] = useState("mobile");
  const getData = async () => {
    const res = await fetch(
      `https://fakestoreapi.in/api/products/category?type=${category}&limit=16`,
    );
    return res.json();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", category],
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

  const categorys = ["tv", "audio", "laptop", "mobile", "gaming", "appliances"];
  const handleCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const categoryBlue = e.currentTarget.value;
    setCategory(categoryBlue);
    console.log(categoryBlue);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <section className="bg-white border-b border-indigo-100">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect electronics for your needs from our curated
              collection
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <Input
                placeholder="Search for your favorite products..."
                className="h-14 pl-6 pr-16 text-lg border-2 border-indigo-200 focus:border-indigo-500 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mr-4">
              <Filter className="h-4 w-4" />
              Categories:
            </div>
            {categorys.map((cat) => (
              <Button
                key={cat}
                variant={cat === category ? "default" : "outline"}
                value={cat}
                onClick={handleCategory}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  cat === category
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg scale-105"
                    : "border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        {!data?.products || data?.products.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No Products Found
              </h2>
              <p className="text-gray-600 mb-8">
                We couldn't find any products in the {category} category. Try
                selecting a different category.
              </p>
              <Button
                onClick={() => setCategory("mobile")}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Browse Mobile Products
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.products.map((item: cardType) => {
              const { id, image, title, description, price } = item;
              return (
                <div key={id} className="group">
                  <Product
                    id={id}
                    image={image?.trim()}
                    title={title}
                    description={description}
                    price={price}
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {data?.products && data.products.length > 0 && (
        <section className="bg-white border-t border-indigo-100 py-8">
          <div className="container mx-auto px-6">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className="rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  />
                </PaginationItem>
                {Array.from({ length: 5 }).map((_, i) => (
                  <PaginationItem key={i}>
                    <Button
                      variant={i === 0 ? "default" : "outline"}
                      className={`w-12 h-12 rounded-xl ${
                        i === 0
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      }`}
                    >
                      {i + 1}
                    </Button>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis className="text-indigo-600" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className="rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      )}
    </main>
  );
}
