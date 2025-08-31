"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import { FaAngellist } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FcShop } from "react-icons/fc";

export default function Navbar() {
  const pathName = usePathname();
  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "About us", url: "/about" },
    { name: "Contact Me", url: "/contact" },
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 bg-white flex items-center justify-between">
      <NavigationMenuItem className="text-5xl p-1" asChild>
        <Link href={"/"} >
          <FcShop className="drop-shadow-md "/>
        </Link>
      </NavigationMenuItem>
      <NavigationMenu className="z-50">
        <NavigationMenuList>
          {navLinks.map((nav, i) => (
            <NavigationMenuItem key={i}>
              <NavigationMenuLink
                asChild
                active
                className={
                  pathName === nav.url.trim()
                    ? "bg-indigo-500 font-bold text-white"
                    : "text-inherit"
                }
              >
                <Link href={nav.url.trim()}>{nav.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenuItem className="text-5xl p-1" asChild>
        <Link href={"/"}>
          <FaAngellist />
        </Link>
      </NavigationMenuItem>
    </nav>
  );
}
