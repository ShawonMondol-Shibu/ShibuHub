import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/product" },
    { name: "About us", url: "/about" },
    { name: "Contact Me", url: "/contact" },
  ];
  return (
    <nav>
      <NavigationMenu>
        <NavigationMenuList>
          {navLinks.map((nav, i) => (
            <NavigationMenuItem key={i}>
              <NavigationMenuLink asChild active>
                <Link href={nav.url}>{nav.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
