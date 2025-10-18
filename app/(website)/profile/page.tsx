import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { LocationEdit, Mail, Phone, User } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <main className="container m-auto p-5">
      <Card className="w-96">
        <CardContent className="grid items-center justify-center gap-5">
          <Avatar className="w-30 h-30 m-auto">
            <AvatarImage src={"/images/owner.png"} width={200} height={200} className="object-cover"/>
            <AvatarFallback>Shawon</AvatarFallback>
          </Avatar>

          

          <Item variant={"muted"} size={"sm"}>
            <ItemMedia>
              <User size={16} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Shawon Mondol Shibu</ItemTitle>
            </ItemContent>
          </Item>
          <Item variant={"muted"} size={"sm"}>
            <ItemMedia>
              <Mail size={16} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Shawonmondolshibu@gmail.com</ItemTitle>
            </ItemContent>
          </Item>
          <Item variant={"muted"} size={"sm"}>
            <ItemMedia>
              <Phone size={16} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>01812014377</ItemTitle>
            </ItemContent>
          </Item>
          <Item variant={"muted"} size={"sm"}>
            <ItemMedia>
              <LocationEdit size={16} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Netrakona, Mymensingh, Bangladesh</ItemTitle>
            </ItemContent>
          </Item>


          
        </CardContent>
      </Card>
    </main>
  );
}
