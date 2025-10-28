"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { CookiesProvider } from "react-cookie";

export const getData = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClent] = useState(() => new QueryClient());
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClent}>{children}</QueryClientProvider>
    </CookiesProvider>
  );
}
