import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import * as React from "react";

export default function Page() {
  return (
    <main>
      <section className="flex items-center justify-center gap-10">

      {
        Array.from({length:5}).map((_,i)=>(
      <Card key={i} className="w-fit">
        <CardContent>
          <Image src={'/images/owner.png'} alt="owner image" width={200} height={200}/>
        </CardContent>
      </Card>
        ))
      }
      </section>
    </main>
  );
}
