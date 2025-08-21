import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <NavigationMenu>
        <NavigationMenuList>
          {Array.from({ length: 5 }).map((_, i) => (
            <NavigationMenuItem key={i}>
              <NavigationMenuLink asChild>
                <Link href={"/"}>Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
