"use client";
import Product from "@/components/layout/Product";
import * as React from "react";

export default function Page() {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10 p-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Product
          key={i}
          id={0}
          image={""}
          title={"product title"}
          description={"product description"}
          price={60}
        />
      ))}
    </div>
  );
}
