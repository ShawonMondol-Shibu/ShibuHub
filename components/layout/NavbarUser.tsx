"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useContext } from "react";
import { userContext } from "../context/contextProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NavbarUser() {
  const { carts, hearts } = useContext(userContext);
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-56 grid gap-2">
        {/* Profile info */}
        <Link
          href={"/profile"}
          className="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
        >
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
        </Link>

        {/* Cart */}
        <Button
          variant="ghost"
          asChild
          className="w-full flex items-center gap-2 justify-between"
        >
          <Link href="/cart">
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart
            </span>
            <span>{carts.length}</span>
          </Link>
        </Button>

        {/* Favourite */}
        <Button
          variant="ghost"
          asChild
          className="w-full flex items-center gap-2 justify-between"
        >
          <Link href="/favourite">
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favourite
            </span>
            <span>{hearts.length}</span>
          </Link>
        </Button>

        {/* Logout */}
        <Button
          onClick={() => {
            router.push("/login");
            toast.success("Logout Successfully.");
          }}
          className="w-full"
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}
