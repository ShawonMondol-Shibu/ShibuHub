"use client";
import Product, { type cardType } from "@/components/layout/Product";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
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
import { Search, Filter } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { LoadingGrid } from "@/components/shared";
import { ErrorPage } from "@/components/shared";
import { EmptyState } from "@/components/shared";

export default function Page() {
  const [Pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    return res.json();
  };

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });

  const finalData = useMemo(() => {
    if (!search) return data;
    const searchTerm = search.toLowerCase().trim();
    return data.filter(
      (item: { title: string; category: string }) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
  }, [data, search]);

  const productLimit = 8;
  const paginatedItem = Math.ceil(finalData.length / productLimit);
  const paginatedData = finalData.slice(
    (Pages - 1) * productLimit,
    Pages * productLimit
  );

  useEffect(() => {
    setPages(1);
  }, [search]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <DynamicBreadcrumb />
        <div className="bg-background border-b border-border py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="h-10 w-64 bg-muted animate-pulse rounded mx-auto" />
            <div className="h-5 w-96 bg-muted animate-pulse rounded mx-auto" />
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <LoadingGrid />
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorPage message={(error as Error).message} onRetry={() => window.location.reload()} />;
  }

  const categorys = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  return (
    <main className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <DynamicBreadcrumb />
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect electronics for your needs from our curated
              collection
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by title or category..."
                className="h-14 pl-6 pr-16 text-lg border-2 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-4">
              <Filter className="h-4 w-4" />
              Categories:
            </div>
            {categorys.map((cat) => (
              <Button
                key={cat}
                variant="outline"
                onClick={() => setSearch(cat)}
                className="px-6 py-2 rounded-full font-medium transition-all duration-300"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {paginatedData.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Products Found"
            description="We couldn't find any matching products. Try a different keyword."
            action={{ label: "Reset Search", onClick: () => setSearch("") }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {paginatedData.map((item: cardType) => {
              const { id, image, title, description, price } = item;
              return (
                <div key={id}>
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

      {finalData.length > productLimit && (
        <section className="bg-background border-t border-border py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPages(Math.max(Pages - 1, 1))}
                    className="rounded-xl"
                  />
                </PaginationItem>

                {Array.from({ length: paginatedItem }).map((_, i) => (
                  <PaginationItem key={i}>
                    <Button
                      variant={Pages === i + 1 ? "default" : "outline"}
                      onClick={() => setPages(i + 1)}
                      className="w-12 h-12 rounded-xl"
                    >
                      {i + 1}
                    </Button>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setPages(Math.min(Pages + 1, paginatedItem))}
                    className="rounded-xl"
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
