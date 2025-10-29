"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { LocationEdit, Mail, Phone, User } from "lucide-react";
import React from "react";
import CompleteOrders from "./CompleteOrders";
import PendingOrders from "./PendingOrders";
import CanceledOrders from "./CanceledOrders";
import { AuthContext } from "@/components/context/AuthProvider";

export default function Page() {
  const { userData } = AuthContext();
  const user = userData[0];
  return (
    <main className="container m-auto p-5 flex flex-wrap items-start gap-10">
      {
        !user ? (<><aside>
        <Card className="w-96">
          <CardContent className="grid items-center justify-center gap-10">
            <figure className="flex justify-center items-center h-60">
              <figcaption>
                <Avatar className="w-30 h-30 m-auto">
                  <AvatarImage
                    src={"/images/owner.png"}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                  <AvatarFallback>{"Shawon"}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mt-5">
                  {" "}
                  {"Guest User"}
                </h2>
              </figcaption>
            </figure>

            <div className="space-y-6">
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <User size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{ "Guest User"}</ItemTitle>
                </ItemContent>
              </Item>
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <Mail size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{ "guest@gmail.com"}</ItemTitle>
                </ItemContent>
              </Item>
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <Phone size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{ "Phone Number"}</ItemTitle>
                </ItemContent>
              </Item>
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <LocationEdit size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{ "Address"}</ItemTitle>
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
      </section></>):
      (<> <aside>
        <Card className="w-96">
          <CardContent className="grid items-center justify-center gap-10">
            <figure className="flex justify-center items-center h-60">
              <figcaption>
                <Avatar className="w-30 h-30 m-auto">
                  <AvatarImage
                    src={"/images/owner.png"}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                  <AvatarFallback>{"Shawon"}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mt-5">
                  {" "}
                  {user.fullName ||"Guest User"}
                </h2>
              </figcaption>
            </figure>

            <div className="space-y-6">
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <User size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{ user.fullName || "Guest User"}</ItemTitle>
                </ItemContent>
              </Item>
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <Mail size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{ user.email || "guest@gmail.com"}</ItemTitle>
                </ItemContent>
              </Item>
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <Phone size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{ user.phone || "Phone Number"}</ItemTitle>
                </ItemContent>
              </Item>
              <Item variant={"muted"} size={"sm"}>
                <ItemMedia>
                  <LocationEdit size={16} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{user.address || "Address"}</ItemTitle>
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
      </section></>)
      }
     
    </main>
  );
}
