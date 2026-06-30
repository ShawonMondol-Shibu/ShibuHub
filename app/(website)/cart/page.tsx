"use client";
import { userContext } from "@/components/context/contextProvider";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { EmptyState } from "@/components/shared";

interface cartItemType {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export default function Page() {
  const { carts, totalPrice, handleQuantity, handleRemoveCart } =
    useContext(userContext);
  const router = useRouter();

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DynamicBreadcrumb />

      {carts.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some products to get started."
          action={{ label: "Browse Products", onClick: () => router.push("/products") }}
        />
      ) : (
        <>
          <div className="space-y-4 mt-8">
            {carts.map((item: cartItemType) => (
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
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                    <p className="text-sm font-medium text-primary mt-1">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <span className="font-semibold text-sm min-w-[60px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemoveCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Total ({carts.length} items)</p>
                <p className="text-2xl font-bold">${totalPrice}</p>
              </div>
              <Button
                size="lg"
                onClick={() => router.push("/checkout")}
                className="w-full sm:w-auto"
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  );
}
