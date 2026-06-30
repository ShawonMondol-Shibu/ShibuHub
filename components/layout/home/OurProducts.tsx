import React from "react";
import Product, { cardType } from "../Product";
import { EmptyState } from "@/components/shared";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface productsDataType {
  productsData: cardType[];
}

export default function OurProducts({ productsData }: productsDataType) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Products</h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
        </div>
        {!productsData ? (
          <EmptyState
            icon={PackageOpen}
            title="Products not found"
            description="Unable to load products at this time."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsData.slice(0, 8).map((item: cardType) => {
                const { id, image, title, description, price } = item;
                return (
                  <Product
                    key={id}
                    id={id}
                    image={image.trim()}
                    title={title}
                    description={description}
                    price={price}
                  />
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}