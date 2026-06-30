"use client";
import { userContext } from "@/components/context/contextProvider";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared";

interface favouriteType {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function Page() {
  const { carts, hearts, handleRemoveHeart } = useContext(userContext);
  const router = useRouter();

  const handleBuy = (id: number) => {
    const isInCart = carts.find((item) => item.id === id);
    if (isInCart) {
      toast.error("Item is already in the cart");
    } else {
      router.push(`/products/${id}`);
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DynamicBreadcrumb />

      {hearts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favourites yet"
          description="Save products you love by clicking the heart icon."
          action={{ label: "Browse Products", onClick: () => router.push("/products") }}
        />
      ) : (
        <div className="space-y-4 mt-8">
          {hearts.map((item: favouriteType) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-16 h-16 relative flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-1">{item.title}</h3>
                  <p className="text-sm font-medium text-primary mt-1">${item.price.toFixed(2)}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBuy(item.id)}
                >
                  View Product
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleRemoveHeart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
