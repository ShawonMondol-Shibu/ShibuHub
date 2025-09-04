import { services } from "@/components/services/electronics";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
              className="w-full max-w-96 m-auto text-center hover:shadow-2xl transition-shadow duration-300 ease-in"
            >
              <CardHeader>
                <item.icon size={70} className="m-auto" />
                <CardAction></CardAction>
                <Badge variant={"secondary"} className="m-auto">
                  {category}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                  <p>{description}</p>
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
