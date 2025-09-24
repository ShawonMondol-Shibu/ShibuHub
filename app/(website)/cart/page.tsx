'use client'
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [quantity, setQuantity]=useState<number>(1);
  const handlePlus = ()=>{setQuantity(quantity+1)};
  const handleMinus = ()=>{setQuantity(quantity-1)};
  return (
    <main className="container m-auto px-5">
      <DynamicBreadcrumb />
      <section>
        <Card className="w-full max-w-max">
          <CardContent className="flex items-center justify-between gap-5">
            <Image
              src={"/placeholder.svg"}
              alt="product image"
              width={500}
              height={500}
              className="w-12 h-12"
            />
            <CardTitle>product title</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant={'ghost'} size={'icon'} onClick={handlePlus} className="cursor-pointer hover:bg-primary hover:text-indigo-50 transition-colors duration-300 ease-out"><Plus/> </Button>
              <span>{quantity}</span>
              <Button variant={'ghost'} size={'icon'} onClick={handleMinus} className="cursor-pointer hover:bg-primary hover:text-indigo-50 transition-colors duration-300 ease-out"><Minus/> </Button>
            </div>
            <span><small><b>$</b></small>{20*quantity }</span>
            <Button variant={"default"} size={"icon"} title="remove the product">
              <Trash2 />
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
