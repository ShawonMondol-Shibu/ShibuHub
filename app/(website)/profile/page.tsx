"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { LocationEdit, Mail, Phone, User } from "lucide-react";
import React from "react";
import CompleteOrders from "./CompleteOrders";
import PendingOrders from "./PendingOrders";
import CanceledOrders from "./CanceledOrders";
import { useAuth } from "@/components/context/AuthProvider";

export default function Page() {
  const { user } = useAuth();

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap items-start gap-10">
      <aside>
        <Card className="w-96 border-border shadow-lg">
          <CardContent className="grid items-center justify-center gap-10">
            <figure className="flex justify-center items-center h-60">
              <figcaption>
                <Avatar className="w-24 h-24 m-auto">
                  <AvatarImage
                    src={"/images/owner.png"}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                  <AvatarFallback>{user?.name?.charAt(0) || "G"}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mt-5">
                  {user?.name || "Guest User"}
                </h2>
              </figcaption>
            </figure>

            <div className="space-y-6">
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <User size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{user?.name || "Guest User"}</ItemTitle>
                </ItemContent>
              </Item>
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <Mail size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{user?.email || "guest@gmail.com"}</ItemTitle>
                </ItemContent>
              </Item>
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <Phone size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{"Phone Number"}</ItemTitle>
                </ItemContent>
              </Item>
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <LocationEdit size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{"Address"}</ItemTitle>
                </ItemContent>
              </Item>
            </div>
          </CardContent>
        </Card>
      </aside>

      <section className="flex flex-wrap items-start justify-center gap-10">
        <PendingOrders />
        <CompleteOrders />
        <CanceledOrders />
      </section>
    </main>
  );
}
