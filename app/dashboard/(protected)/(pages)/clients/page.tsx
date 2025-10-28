"use client";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import * as React from "react";

export default function Page() {
  const [page, setPage] = React.useState(1);
  const { data } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await fetch(`https://fakestoreapi.com/users`);
      const data = await response.json();
      return data;
    },
  });
  const limit: number = 8;
  const prev: number = Math.ceil(page - 1) * limit;
  const next: number = page * limit;
  const paginatiedItem = Math.ceil(data?.length / limit);
  return (
    <main className="py-10">
      <section className="flex flex-wrap items-center justify-center gap-10 mb-10">
        {data
          ?.slice(prev, next)
          .map(
            (item: {
              id: number;
              username: string;
              email: string;
              password: string;
            }) => (
              <Card key={item.id} className="w-fit text-center">
                <CardContent>
                  <Image
                    src={"/images/owner.png"}
                    alt="Logo"
                    width={200}
                    height={200}
                    className="rounded-full w-40 h-40 object-cover"
                  />
                </CardContent>
                <CardFooter className="text-center m-auto">
                  <div>
                    <CardTitle>{item.username}</CardTitle>
                    <p>{item.email}</p>
                    <p>{item.password}</p>
                  </div>
                </CardFooter>
              </Card>
            ),
          )}
      </section>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          {Array.from({ length: paginatiedItem }, (_, i) => (
            <PaginationItem
              key={i}
              onClick={() => {
                setPage(i + 1);
                alert(page);
              }}
            >
              <PaginationLink>{i + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
