import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <main className="container m-auto">
      <DynamicBreadcrumb />
      <section>
        <Card className="w-full max-w-max">
          <CardContent className="flex items-center justify-between gap-5">
            <Image
              src={"/placeholder.svg"}
              alt="product image"
              width={80}
              height={80}
            />
            <CardTitle>product title</CardTitle>
            <div className="flex items-center gap-2">
              <Label>quantity:</Label>
              <Input type="number" defaultValue={1} />
            </div>
            <span>price: 5000 </span>
            <Button variant={"ghost"} size={"icon"} title="remove the product">
              <Trash2 />
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
