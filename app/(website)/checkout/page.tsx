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
import { audio } from "@/lib/alert";
import { Mail, MapPin, Phone,  User } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function Page() {
  const { carts, setCarts } = useContext(userContext);
  const userInfo = [
    { icon: User, title: "Shawon Mondol Shibu" },
    { icon: Mail, title: "ShawonMondolShibu@gmail.com" },
    { icon: Phone, title: "01812014377" },
    { icon: MapPin, title: "Netrakona, Mymenshingh, Bangladesh" },
  ];
  const handleBuy = () => {
    if (carts.length === 0) {
      toast.error("please add an items");
    } else {
      toast.success("Order Placed Successfully.");
      setCarts([]);
      audio.play()
    }
  };
  const totalPrice = carts.reduce((total, item)=> (total + item.price * item.quantity),0)
  return (
    <main className="container m-auto p-5 flex md:flex-nowrap flex-wrap  items-start md:justify-between justify-center gap-10">
      <section className="space-y-5">
        {carts.length === 0 ? (
          <Item variant={"default"} className="flex items-center min-w-sm">
            <ItemMedia></ItemMedia>
            <ItemContent>
              <ItemTitle className="text-xl">Theres no item to buy</ItemTitle>
            </ItemContent>
          </Item>
        ) : (
          carts.map((item) => (
            <Item
              key={item.id}
              variant={"muted"}
              className="flex items-center min-w-sm shadow "
            >
              <ItemHeader>Item id</ItemHeader>
              <ItemMedia>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={item.image}
                    alt=""
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                  <AvatarFallback>{item.title}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
              <ItemActions className="space-x-2">
                <span>{`Quantity: ${item.quantity}`}</span>
                <span>
                  <small>$</small>
                  {`${item.price*item.quantity}`}
                </span>
              </ItemActions>
            </Item>
          ))
        )}
      </section>

      <Card className="w-full max-w-min ">
        <CardContent className="space-y-10">
          <div className="space-y-4">
            {userInfo.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <item.icon size={18} />
                <p className="capitalize">{item.title}</p>
              </span>
            ))}
          </div>

          <span className="text-xl font-semibold">Total Price: <small>$</small>{totalPrice}</span>
        </CardContent>

        <CardFooter>
          <Button onClick={() => handleBuy()} className="w-full">
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
