"use client";
import Product from "@/components/layout/Product";
import * as React from "react";

export default function Page() {
  return (
    <div className="grid grid-cols-4 gap-10 p-4">
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
