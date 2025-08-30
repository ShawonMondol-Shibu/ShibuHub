"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export const getData = async () => {
  const res = await fetch("https://fakestoreapi.in/api/products");
  return res.json();
};

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClent] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClent}>{children}</QueryClientProvider>
  );
}
