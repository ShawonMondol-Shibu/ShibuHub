import { services } from "@/components/services/electronics";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

export default function Electronics() {
  return (
    <main>
      <CardTitle className="text-center text-5xl">
        Electronics-Specific Services
      </CardTitle>
      <section className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mt-20">
        {services.map((item) => {
          const { id, title, category, description } = item;
          return (
            <Card
              key={id}
              className="max-w-max m-auto text-center hover:shadow-2xl transition-shadow duration-300 ease-in"
            >
              <CardHeader>
                <item.icon size={70} className="m-auto" />
              </CardHeader>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <p>{description}</p>
              </CardContent>
              <CardFooter>
                <Badge
                  variant={"secondary"}
                  // className="m-auto bg-indigo-300 text-white"
                >
                  {category}
                </Badge>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
