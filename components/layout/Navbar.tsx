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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";

export default function Navbar() {
  const pathName = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "About us", url: "/about" },
    { name: "Contact Me", url: "/contact" },
    { name: "Dashboard", url: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-background/50 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavigationMenuItem className="flex-shrink-0" asChild>
            <Link
              href="/"
              className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
            >
              <FcShop
                className="drop-shadow-lg transition-transform duration-200 group-hover:rotate-12"
                size={40}
              />
              <span className="hidden sm:block font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ShibuHub
              </span>
            </Link>
          </NavigationMenuItem>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-1">
              {navLinks.map((nav, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={nav.url.trim()}
                      className={`
                        relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out
                        hover:bg-accent hover:text-indigo-500
                        ${
                          pathName === nav.url.trim()
                            ? "bg-indigo-500 text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      {nav.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Avatar */}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/40 py-2">
            <div className="flex flex-col space-y-1">
              {navLinks.map((nav, i) => (
                <Link
                  key={i}
                  href={nav.url.trim()}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out
                    ${
                      pathName === nav.url.trim()
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }
                  `}
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
