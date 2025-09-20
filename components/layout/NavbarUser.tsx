import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function NavbarUser() {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="grid gap-2 items-center">
        
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">shawon mondol shibu</span>
            <span className="text-muted-foreground truncate text-xs">
              shawonmondolshibu@gmail.com
            </span>
          </div>
        </div>
        <Button
          variant={"ghost"}
          asChild
          className="flex items-center gap-2 justify-between"
        >
          <Link href={"/cart"}>
            <span className="flex items-center gap-2">
              <ShoppingCart />
              Cart
            </span>
            <span>10</span>
          </Link>
        </Button>
       <Button
          variant={"ghost"}
          asChild
          className="flex items-center gap-2 justify-between"
        >
          <Link href={"/favourite"}>
            <span className="flex items-center gap-2">
              <Heart />
              Favourite
            </span>
            <span>10</span>
          </Link>
        </Button>

        <Button>
            Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}
