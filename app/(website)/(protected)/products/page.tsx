/* eslint-disable react/no-unescaped-entities */
"use client";
import Product, { type cardType } from "@/components/layout/Product";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export default function Page() {
  const [Pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch all products
  const getData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    return res.json();
  };

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });

  // Filter products based on search input
  const finalData = useMemo(() => {
    if (!search) return data;
    const searchTerm = search.toLowerCase().trim();
    return data.filter(
      (item: { title: string; category: string }) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
  }, [data, search]);

  // Pagination logic
  const productLimit = 8;
  const paginatedItem = Math.ceil(finalData.length / productLimit);
  const paginatedData = finalData.slice(
    (Pages - 1) * productLimit,
    Pages * productLimit
  );

  useEffect(() => {
    setPages(1); // reset to page 1 when search changes
  }, [search]);

  // Loading state
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-lg text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    );

  // Error state
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      {/* Header Section */}
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

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by title or category..."
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

          {/* Category Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mr-4">
              <Filter className="h-4 w-4" />
              Categories:
            </div>
            {categorys.map((cat) => (
              <Button
                key={cat}
                variant="outline"
                onClick={() => setSearch(cat)}
                className="px-6 py-2 rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 font-medium transition-all duration-300"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-6 py-16">
        {paginatedData.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No Products Found
              </h2>
              <p className="text-gray-600 mb-8">
                We couldn't find any matching products. Try a different keyword.
              </p>
              <Button
                onClick={() => setSearch("")}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Reset Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paginatedData.map((item: cardType) => {
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

      {/* Pagination */}
      {finalData.length > productLimit && (
        <section className="bg-white border-t border-indigo-100 py-8">
          <div className="container mx-auto px-6">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPages(Math.max(Pages - 1, 1))}
                    className="rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  />
                </PaginationItem>

                {Array.from({ length: paginatedItem }).map((_, i) => (
                  <PaginationItem key={i}>
                    <Button
                      variant={Pages === i + 1 ? "default" : "outline"}
                      onClick={() => setPages(i + 1)}
                      className={`w-12 h-12 rounded-xl ${
                        Pages === i + 1
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      }`}
                    >
                      {i + 1}
                    </Button>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setPages(Math.min(Pages + 1, paginatedItem))}
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
