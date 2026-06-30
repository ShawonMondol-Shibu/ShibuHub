"use client";
import { userContext } from "@/components/context/contextProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ShoppingBag } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/shared";

export default function Page() {
  const { carts, setCarts } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (carts.length === 0) {
      toast.error("Please add items to your cart");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: carts.map((item) => ({
            id: String(item.id),
            name: item.title,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (data.url) {
        setCarts([]);
        window.location.href = data.url;
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex md:flex-nowrap flex-wrap items-start md:justify-between justify-center gap-10">
      <section className="space-y-4 flex-1">
        {carts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some items to check out.</p>
          </div>
        ) : (
          carts.map((item) => (
            <Item
              key={item.id}
              variant="muted"
              className="flex items-center shadow"
            >
              <ItemHeader>Item</ItemHeader>
              <ItemMedia>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={item.image}
                    alt=""
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                  <AvatarFallback>{item.title.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
              <ItemActions className="space-x-2">
                <span className="text-muted-foreground">Qty: {item.quantity}</span>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </ItemActions>
            </Item>
          ))
        )}
      </section>

      <Card className="w-full max-w-sm">
        <CardContent className="space-y-6 pt-6">
          <h3 className="text-lg font-semibold">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items</span>
              <span>{carts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-primary">Free</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pb-6">
          <Button
            onClick={handleBuy}
            className="w-full"
            disabled={loading || carts.length === 0}
          >
            {loading ? <Spinner size="sm" className="mr-2" /> : null}
            {loading ? "Processing..." : "Pay with Stripe"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
