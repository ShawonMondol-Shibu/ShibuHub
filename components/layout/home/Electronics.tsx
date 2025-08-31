import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Headphones } from "lucide-react";
import { services } from "@/components/services/electronics.json";
import React from "react";
interface itemType {
  title: string;
  id: number;
  description: string;
  category: string;
  icon: React.ReactNode;
}

export default function Electronics() {
  return (
    <main>
      <CardTitle className="text-center text-5xl">
        Electronics-Specific Services
      </CardTitle>
      <section className="flex items-center justify-center">
        {services.map((item) => {
          const { id, title, category, description, icon } = item;
          return (
            <Card key={id} className="max-w-70 text-center">
              <CardHeader></CardHeader>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <p>{description}</p>
              </CardContent>
              <CardFooter>
                <Badge variant={"secondary"} className="m-auto">{category}</Badge>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
