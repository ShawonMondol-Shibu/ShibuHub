"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FcShop } from "react-icons/fc";
import { useState, useEffect } from "react";
import NavbarUser from "./NavbarUser";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathName = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <nav className={cn(
      "sticky top-0 left-0 z-50 w-full h-16 transition-all duration-300",
      scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
        : "bg-background/60 backdrop-blur-md border-b border-border/50"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
          >
            <FcShop
              className="drop-shadow-lg transition-transform duration-200 group-hover:rotate-12"
              size={36}
            />
            <span className="hidden sm:block font-bold text-lg text-foreground">
              ShibuHub
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-1">
              {navLinks.map((nav) => (
                <NavigationMenuItem key={nav.url}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={nav.url}
                      className={cn(
                        "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                        pathName === nav.url
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {nav.name}
                      {pathName === nav.url && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2">
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={cn(
                    "h-0.5 bg-foreground transition-all duration-300 origin-left",
                    mobileOpen && "rotate-45 w-[21px]"
                  )} />
                  <span className={cn(
                    "h-0.5 bg-foreground transition-all duration-200",
                    mobileOpen && "opacity-0"
                  )} />
                  <span className={cn(
                    "h-0.5 bg-foreground transition-all duration-300 origin-left",
                    mobileOpen && "-rotate-45 w-[21px]"
                  )} />
                </div>
              </button>
            </div>
            <NavbarUser />
          </div>
        </div>

        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="border-t border-border/50 py-2 space-y-1">
            {navLinks.map((nav) => (
              <Link
                key={nav.url}
                href={nav.url}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                  pathName === nav.url
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
