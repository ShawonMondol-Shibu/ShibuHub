import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import * as React from "react";

export default function Page() {
  return (
    <main className="py-10">
      <section className="flex flex-wrap items-center justify-center gap-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="w-fit">
            <CardContent className="space-y-2 text-center">
              <Image
                src={"/images/owner.png"}
                alt="owner image"
                width={200}
                height={200}
                className="w-20 h-20 object-cover rounded-full m-auto"
              />
              <div>
                <CardTitle>shibu mondol</CardTitle>
                <p>shibu@gmail.com</p>
                <p>+880199*******</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
