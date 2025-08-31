import { electronicType, itemType, services } from "@/components/services/electronics";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideProps } from "lucide-react";

import React from "react";
export interface electronicType {
  title: string;
  id: number;
  description: string;
  category: string;
  icon: LucideProps;
}


export default function Electronics() {

  return (
    <main>
      <CardTitle className="text-center text-5xl">
        Electronics-Specific Services
      </CardTitle>
      <section className="flex items-center justify-center gap-20 mt-20">
        {services.map((item:electronicType) => {
          const { id, title, category, description } = item;
          return (
            <Card key={id} className="max-w-70 text-center">
              <CardHeader>
             <item.icon size={70} className="m-auto"/>
                
              </CardHeader>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <p>{description}</p>
              </CardContent>
              <CardFooter>
                <Badge
                  variant={"secondary"}
                  className="m-auto bg-indigo-300 text-white"
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
