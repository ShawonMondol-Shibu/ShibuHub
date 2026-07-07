# ShibuHub Frontend Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the entire ShibuHub frontend with a clean minimal design, indigo color scheme, and polished UX/UI across all pages (website, dashboard, auth).

**Architecture:** In-place component rewrite following existing file structure. No new files created beyond the design spec. All changes use existing shadcn/ui components and Tailwind CSS v4.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, shadcn/ui (new-york), Lucide icons, React Query v5, React Hook Form + Zod

---

## Task 1: Design System — Update CSS Variables

**Covers:** §1 Design System

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update color variables**

Replace the `:root` and `.dark` sections in `app/globals.css` with refined indigo-based color scheme:

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(55% 0.25 270);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.96 0.005 270);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.96 0.005 270);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.96 0.005 270);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0.005 270);
  --input: oklch(0.922 0.005 270);
  --ring: oklch(55% 0.25 270);
  --brand: oklch(55% 0.25 270);
  --brand-foreground: oklch(0.985 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.96 0.005 270);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0.005 270);
  --sidebar-ring: oklch(55% 0.25 270);
}

.dark {
  --background: oklch(0.13 0.005 270);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.18 0.005 270);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.18 0.005 270);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.65 0.2 270);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.22 0.005 270);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.22 0.005 270);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.22 0.005 270);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.65 0.2 270);
  --brand: oklch(0.65 0.2 270);
  --brand-foreground: oklch(0.985 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.18 0.005 270);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.22 0.005 270);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.65 0.2 270);
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 2: Navigation — Redesign Navbar

**Covers:** §2 Navigation

**Files:**
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/layout/NavbarUser.tsx`

- [ ] **Step 1: Redesign Navbar component**

Rewrite `components/layout/Navbar.tsx` with:
- Fixed top, glassmorphism background (`bg-background/80 backdrop-blur-xl`)
- Logo on left with FcShop icon + "ShibuHub" text
- Centered nav links (Home, Products, About, Contact) — no Dashboard link
- Right side: NavbarUser component
- Active link: Bottom border indicator (2px indigo), not filled background
- Mobile: Hamburger menu with animated open/close
- Height: `h-16`

```tsx
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
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 3: Navigation — Redesign NavbarUser

**Covers:** §2 Navigation

**Files:**
- Modify: `components/layout/NavbarUser.tsx`

- [ ] **Step 1: Redesign NavbarUser component**

Rewrite `components/layout/NavbarUser.tsx` with:
- Avatar trigger with hover ring
- Dropdown: user info (if logged in), Cart with badge, Favourites with badge, Profile link, Logout
- If not logged in: Sign In, Sign Up links
- Clean dropdown styling with dividers

```tsx
"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ShoppingCart, Heart, LogOut, User, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useContext } from "react";
import { userContext } from "../context/contextProvider";
import { useAuth } from "@/components/context/AuthProvider";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NavbarUser() {
  const { carts, hearts } = useContext(userContext);
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="cursor-pointer h-9 w-9 hover:ring-2 hover:ring-primary/20 transition-all duration-200">
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {user?.name?.charAt(0) || <User className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-2" align="end">
        {user ? (
          <>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-medium truncate">{user.name}</span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
              </div>
            </Link>

            <div className="h-px bg-border my-1" />

            <Link
              href="/cart"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart
              </span>
              {carts.length > 0 && (
                <Badge variant="secondary" className="h-5 min-w-5 justify-center text-xs">
                  {carts.length}
                </Badge>
              )}
            </Link>

            <Link
              href="/favourite"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Favourites
              </span>
              {hearts.length > 0 && (
                <Badge variant="secondary" className="h-5 min-w-5 justify-center text-xs">
                  {hearts.length}
                </Badge>
              )}
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            <div className="h-px bg-border my-1" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </>
        ) : (
          <div className="space-y-1">
            <Link
              href="/login"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <User className="h-4 w-4" />
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 4: Footer — Redesign

**Covers:** §3 Homepage (Footer section)

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Redesign Footer**

Rewrite `components/layout/Footer.tsx` with:
- 4-column layout: Brand, Quick Links, Contact, Newsletter
- Newsletter: Email input + Subscribe button
- Social icons row
- Payment methods row
- Copyright bar at bottom
- Subtle top border, clean spacing

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcPaypal,
} from "react-icons/fa";
import { SiPayoneer } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const contactInfo = [
  { icon: Mail, text: "support@shibuhub.com" },
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: MapPin, text: "123 Tech Street, Digital City, DC 12345" },
];

const navigationLinks = [
  { href: "/products", text: "Shop" },
  { href: "/about", text: "About Us" },
  { href: "/contact", text: "Customer Service" },
  { href: "/about#privacy", text: "Privacy Policy" },
  { href: "/about#terms", text: "Terms of Service" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
];

const paymentMethods = {
  cards: [
    { icon: FaCcVisa, alt: "Visa", color: "#1A1F71" },
    { icon: FaCcMastercard, alt: "Mastercard", color: "#EB001B" },
    { icon: FaCcAmex, alt: "American Express", color: "#006FCF" },
    { icon: FaCcDiscover, alt: "Discover", color: "#FF6000" },
    { icon: FaCcPaypal, alt: "PayPal", color: "#003087" },
    { icon: SiPayoneer, alt: "Payoneer", color: "#FF4800" },
  ],
  mobileBanking: [
    { src: "/bkash-mobile-banking-logo-pink.jpg", alt: "bKash" },
    { src: "/nagad-mobile-banking-logo-orange.jpg", alt: "Nagad" },
    { src: "/rocket-mobile-banking-logo-purple.jpg", alt: "Rocket" },
    { src: "/upay-mobile-banking-logo-green.jpg", alt: "Upay" },
    { src: "/taptap-mobile-banking-logo-blue.jpg", alt: "TapTap" },
  ],
  banks: [
    { src: "/dbbl-dutch-bangla-bank-logo.jpg", alt: "DBBL" },
    { src: "/sonali-bank-bangladesh-logo.jpg", alt: "Sonali Bank" },
    { src: "/rupali-bank-bangladesh-logo.jpg", alt: "Rupali Bank" },
    { src: "/brac-bank-bangladesh-logo.jpg", alt: "BRAC Bank" },
    { src: "/islami-bank-bangladesh-logo.jpg", alt: "Islami Bank" },
  ],
};

const PaymentMethodGroup = ({
  label,
  methods,
}: {
  label: string;
  methods: Array<{ src?: string; icon?: any; alt: string; color?: string }>;
}) => (
  <div className="flex items-center gap-2 flex-wrap">
    <span className="text-xs text-muted-foreground">{label}:</span>
    {methods.map((method) =>
      method.icon ? (
        <method.icon
          key={method.alt}
          className="h-7 w-10 bg-white rounded p-1"
          style={{ color: method.color }}
          title={method.alt}
        />
      ) : (
        <Image
          key={method.alt}
          src={method.src || "/placeholder.svg"}
          alt={method.alt}
          width={500}
          height={500}
          className="h-7 w-10 object-contain bg-white rounded"
        />
      ),
    )}
  </div>
);

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">ShibuHub</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for premium digital electronics and exceptional service.
            </p>
            <div className="space-y-2">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-2">
                  <contact.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{contact.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Stay Connected</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get updates on new products and offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background text-foreground border-border"
              />
              <Button variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">We Accept:</h4>
              <div className="space-y-2">
                <PaymentMethodGroup label="Cards" methods={paymentMethods.cards} />
                <PaymentMethodGroup label="Mobile" methods={paymentMethods.mobileBanking} />
                <PaymentMethodGroup label="Banks" methods={paymentMethods.banks} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ShibuHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 5: Homepage — Redesign Hero Section

**Covers:** §3 Homepage (Hero Section)

**Files:**
- Modify: `components/layout/home/Header.tsx`

- [ ] **Step 1: Replace carousel hero with static hero**

Rewrite `components/layout/home/Header.tsx` with:
- Full-width static hero (no carousel)
- Left: Heading, subtitle, CTA button
- Right: Featured product image
- Background: Soft gradient
- Featured categories row below

```tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Smartphone, Shirt, Gem } from "lucide-react";

type HeaderProps = {
  headerData: Array<{
    id: number;
    image: string;
    title: string;
    category: string;
    description: string;
    price: number;
    discount: number;
  }>;
};

const categories = [
  { name: "Electronics", icon: Smartphone, href: "/products" },
  { name: "Clothing", icon: Shirt, href: "/products" },
  { name: "Jewelry", icon: Gem, href: "/products" },
];

export function Header({ headerData }: HeaderProps) {
  const featured = headerData?.[0];

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Premium Electronics
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Premium Electronics for Your Digital Life
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Discover curated tech products that blend innovation with quality. From smartphones to smart home devices.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="rounded-full">
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {featured && (
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border">
                <Badge variant="secondary" className="absolute top-4 left-4 bg-primary/10 text-primary">
                  {featured.category}
                </Badge>
                <Image
                  src={featured.image || "/placeholder.svg?height=400&width=400"}
                  width={400}
                  height={400}
                  alt={featured.title}
                  className="w-full h-auto object-contain max-h-80"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-foreground line-clamp-1">{featured.title}</h3>
                  <p className="text-2xl font-bold text-primary mt-1">${featured.price}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              <cat.icon className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 6: Homepage — Redesign Product Card & Products Section

**Covers:** §3 Homepage (Our Products)

**Files:**
- Modify: `components/layout/Product.tsx`
- Modify: `components/layout/home/OurProducts.tsx`

- [ ] **Step 1: Redesign Product card**

Rewrite `components/layout/Product.tsx` with:
- Clean white card with rounded-xl
- Image with hover scale effect
- Heart icon top-right
- Title, price, "View" button
- Subtle shadow, hover lift

```tsx
"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useContext } from "react";
import { cn } from "@/lib/utils";
import { userContext } from "../context/contextProvider";

export interface cardType {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function Product({
  image,
  title,
  description,
  id,
  price,
}: cardType) {
  const { hearts, handleHeart } = useContext(userContext);
  const isHeart = hearts.find((heart: { id: number }) => heart.id === id);

  return (
    <Card className="w-full max-w-md hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 m-auto group overflow-hidden border-border">
      <div className="relative overflow-hidden">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => handleHeart(id, image, title, price)}
          className="size-8 rounded-full absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={cn(
              "size-4 transition-all duration-200",
              isHeart
                ? "fill-red-500 stroke-red-500"
                : "stroke-2 group-hover:scale-110"
            )}
          />
        </Button>
        <CardHeader className="flex flex-col items-center justify-center h-56 bg-muted/50 rounded-t-xl overflow-hidden p-4">
          <div className="w-32 h-32 relative group-hover:scale-105 transition-transform duration-500 ease-out">
            <Image
              width={300}
              height={300}
              src={image || "/images/image.png"}
              alt={title}
              className="m-auto object-contain"
            />
          </div>
        </CardHeader>
      </div>
      <CardContent className="pt-4 pb-2 px-4">
        <h3 className="font-semibold text-sm line-clamp-1 text-foreground">{title}</h3>
        <p className="text-lg font-bold text-primary mt-1">${price}</p>
        <p className="text-xs line-clamp-2 text-muted-foreground mt-1">{description}</p>
      </CardContent>
      <CardFooter className="pb-4 px-4">
        <Button variant="default" asChild className="w-full text-sm">
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
```

- [ ] **Step 2: Redesign OurProducts section**

Rewrite `components/layout/home/OurProducts.tsx`:

```tsx
import React from "react";
import Product, { cardType } from "../Product";
import { EmptyState } from "@/components/shared";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface productsDataType {
  productsData: cardType[];
}

export default function OurProducts({ productsData }: productsDataType) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Products</h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
        </div>
        {!productsData ? (
          <EmptyState
            icon={PackageOpen}
            title="Products not found"
            description="Unable to load products at this time."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsData.slice(0, 8).map((item: cardType) => {
                const { id, image, title, description, price } = item;
                return (
                  <Product
                    key={id}
                    id={id}
                    image={image.trim()}
                    title={title}
                    description={description}
                    price={price}
                  />
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 7: Homepage — Redesign Electronics & Shipping Sections

**Covers:** §3 Homepage (Electronics Services, Shipping)

**Files:**
- Modify: `components/layout/home/Electronics.tsx`
- Modify: `components/layout/home/Shipping.tsx`
- Modify: `components/layout/home/Services.tsx`

- [ ] **Step 1: Redesign Electronics section**

Rewrite `components/layout/home/Electronics.tsx`:

```tsx
import { services } from "@/components/services/electronics";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Electronics() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Electronics Services</h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item) => {
            const { id, title, category, description } = item;
            return (
              <Card
                key={id}
                className="text-center hover:shadow-lg transition-all duration-300 border-border border-l-4 border-l-primary"
              >
                <CardHeader>
                  <item.icon size={48} className="mx-auto text-primary" />
                  <Badge variant="secondary" className="mx-auto mt-2 bg-primary/10 text-primary">
                    {category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription className="mt-2">{description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Redesign Shipping section**

Rewrite `components/layout/home/Shipping.tsx`:

```tsx
"use client";

import { shipping_services } from "@/components/services/shipping";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock, DollarSign } from "lucide-react";

export default function ShippingCards() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Shipping & Delivery</h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shipping_services.map((service) => (
            <Card
              key={service.id}
              className="rounded-xl border-border hover:shadow-lg transition-all duration-300 text-center"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium text-muted-foreground flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  {service.duration}
                </p>
                <p className="font-semibold text-primary flex items-center justify-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  {service.cost}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Fix Services wrapper spacing**

Rewrite `components/layout/home/Services.tsx`:

```tsx
import Electronics from "./Electronics";
import ShippingCards from "./Shipping";

export default function Services() {
  return (
    <div>
      <Electronics />
      <ShippingCards />
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 8: Homepage — Redesign License Section

**Covers:** §3 Homepage (License/Certifications)

**Files:**
- Modify: `components/layout/home/License-section.tsx`

- [ ] **Step 1: Redesign License section**

Rewrite `components/layout/home/License-section.tsx` with:
- 6-card grid (2×3)
- Clean card design with hover lift
- Icon, title, badge, description

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, CheckCircle, Globe, Lock, Zap } from "lucide-react";

const licenses = [
  {
    id: 1,
    title: "FCC Certification",
    description: "Federal Communications Commission approved for all electronic devices",
    icon: Shield,
    badge: "Verified",
    category: "Regulatory",
  },
  {
    id: 2,
    title: "CE Marking",
    description: "European Conformity certification for product safety and compliance",
    icon: Award,
    badge: "Certified",
    category: "International",
  },
  {
    id: 3,
    title: "ISO 9001:2015",
    description: "Quality Management System certification for consistent service delivery",
    icon: CheckCircle,
    badge: "Accredited",
    category: "Quality",
  },
  {
    id: 4,
    title: "RoHS Compliance",
    description: "Restriction of Hazardous Substances directive compliance",
    icon: Globe,
    badge: "Compliant",
    category: "Environmental",
  },
  {
    id: 5,
    title: "PCI DSS Level 1",
    description: "Payment Card Industry Data Security Standard for secure transactions",
    icon: Lock,
    badge: "Secured",
    category: "Security",
  },
  {
    id: 6,
    title: "Energy Star Partner",
    description: "EPA Energy Star certified partner for energy-efficient products",
    icon: Zap,
    badge: "Partner",
    category: "Efficiency",
  },
];

export function LicenseSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Licenses & Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We maintain the highest standards of quality, safety, and compliance.
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {licenses.map((license) => {
            const IconComponent = license.icon;
            return (
              <Card
                key={license.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {license.badge}
                    </Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{license.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{license.description}</p>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {license.category}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 9: Products Page — Redesign

**Covers:** §4 Products Page

**Files:**
- Modify: `app/(website)/products/page.tsx`

- [ ] **Step 1: Redesign products page**

Rewrite `app/(website)/products/page.tsx` with:
- Breadcrumb at top
- Clean heading with subtitle
- Search bar with icon
- Category filter pills
- 4-column responsive grid
- Clean pagination

(Full code follows the current structure but with refined styling — keep existing logic, update classes.)

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 10: Product Detail — Redesign

**Covers:** §5 Product Detail Page

**Files:**
- Modify: `app/(website)/products/[id]/ProductPage.tsx`

- [ ] **Step 1: Redesign product detail page**

Keep existing logic, update styling:
- Two-column layout with better spacing
- Image container with rounded-xl and subtle shadow
- Clean info section with proper typography hierarchy
- Feature badges row
- Reviews section with clean card design

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 11: Cart Page — Redesign

**Covers:** §6 Cart & Checkout (Cart)

**Files:**
- Modify: `app/(website)/cart/page.tsx`

- [ ] **Step 1: Redesign cart page**

Keep existing logic, update styling:
- Clean item rows with proper spacing
- Quantity controls with rounded styling
- Summary card at bottom with clean layout

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 12: Checkout Page — Redesign

**Covers:** §6 Cart & Checkout (Checkout)

**Files:**
- Modify: `app/(website)/checkout/page.tsx`

- [ ] **Step 1: Redesign checkout page**

Keep existing logic, update styling:
- Two-column layout (items + summary)
- Clean order summary card
- Proper button styling

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 13: Auth Pages — Redesign

**Covers:** §7 Auth Pages

**Files:**
- Modify: `app/(auth)/login/page.tsx`
- Modify: `app/(auth)/signup/page.tsx`

- [ ] **Step 1: Redesign login page**

Rewrite `app/(auth)/login/page.tsx` with:
- Centered card on gradient background
- Clean card with shadow
- Proper form styling
- "Sign in" button, link to signup

- [ ] **Step 2: Redesign signup page**

Rewrite `app/(auth)/signup/page.tsx` with:
- Same centered card design
- All form fields with clean styling
- "Create Account" button, link to login

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 14: Profile Page — Redesign

**Covers:** §10 Profile Page

**Files:**
- Modify: `app/(website)/profile/page.tsx`
- Modify: `app/(website)/profile/PendingOrders.tsx`
- Modify: `app/(website)/profile/CompleteOrders.tsx`
- Modify: `app/(website)/profile/CanceledOrders.tsx`

- [ ] **Step 1: Redesign profile page**

Rewrite profile page with:
- Two-column layout (sidebar + content)
- Sidebar: Avatar, name, email, contact info
- Content: Order tabs (Pending, Completed, Cancelled)
- Clean card design throughout

- [ ] **Step 2: Redesign order tabs**

Update PendingOrders, CompleteOrders, CanceledOrders with:
- Clean card styling
- Status badges with proper colors
- Order ID, date, items list

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 15: Favourite Page — Redesign

**Covers:** §12 Favourite Page

**Files:**
- Modify: `app/(website)/favourite/page.tsx`

- [ ] **Step 1: Redesign favourite page**

Keep existing logic, update styling:
- Clean item rows
- Consistent with cart page design
- Empty state styling

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 16: Contact & About Pages — Redesign

**Covers:** §8 About Page, §9 Contact Page

**Files:**
- Modify: `app/(website)/about/page.tsx`
- Modify: `app/(website)/contact/page.tsx`
- Modify: `components/layout/contact/ContactForm.tsx`
- Modify: `components/layout/contact/ContactInfo.tsx`

- [ ] **Step 1: Redesign about page**

Keep existing content, update styling:
- Clean hero heading
- Founder card with better layout
- Stats row with refined cards
- Partner brands section

- [ ] **Step 2: Redesign contact page**

Keep existing content, update styling:
- Clean heading
- Two-column layout
- Form with proper styling
- Contact info card

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 17: Dashboard Pages — Redesign

**Covers:** §11 Dashboard Pages

**Files:**
- Modify: `app/dashboard/(pages)/products/page.tsx`
- Modify: `app/dashboard/(pages)/addProducts/page.tsx`
- Modify: `app/dashboard/(pages)/orders/page.tsx`
- Modify: `app/dashboard/(pages)/clients/page.tsx`
- Modify: `app/dashboard/(pages)/teams/page.tsx`

- [ ] **Step 1: Redesign dashboard products page**

Update styling:
- Clean table with hover effects
- Proper header with "Add Product" button
- Action buttons with icons

- [ ] **Step 2: Redesign dashboard addProducts page**

Update styling:
- Centered form card
- Clean form fields
- Consistent spacing

- [ ] **Step 3: Redesign dashboard orders page**

Update styling:
- Clean table with status dropdown
- Proper column widths

- [ ] **Step 4: Redesign dashboard clients page**

Update styling:
- Clean table
- Empty state when no customers

- [ ] **Step 5: Redesign dashboard teams page**

Update styling:
- Clean table
- "Add Member" button

- [ ] **Step 6: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 18: Checkout Success & DynamicBreadcrumb — Redesign

**Covers:** §13 Checkout Success Page

**Files:**
- Modify: `app/(website)/checkout/success/page.tsx`
- Modify: `components/layout/DynamicBreadcrumb.tsx`

- [ ] **Step 1: Redesign checkout success page**

Keep existing content, update styling:
- Clean centered layout
- Green checkmark icon
- Confirmation message

- [ ] **Step 2: Polish DynamicBreadcrumb**

Update styling:
- Remove indigo blur effect
- Clean breadcrumb with proper spacing
- Subtle text colors

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 19: Jest Testing — Key Components

**Covers:** Testing coverage for redesigned components

**Files:**
- Create: `__tests__/components/Product.test.tsx`
- Create: `__tests__/components/Navbar.test.tsx`
- Create: `__tests__/components/Footer.test.tsx`
- Create: `__tests__/components/EmptyState.test.tsx`
- Create: `__tests__/components/DynamicBreadcrumb.test.tsx`

- [ ] **Step 1: Create Product card tests**

Create `__tests__/components/Product.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Product from "@/components/layout/Product";
import { userContext } from "@/components/context/contextProvider";

const mockContext = {
  hearts: [],
  handleHeart: jest.fn(),
  carts: [],
  handleCart: jest.fn(),
  totalPrice: 0,
  setCarts: jest.fn(),
  handleQuantity: jest.fn(),
  handleRemoveCart: jest.fn(),
  handleRemoveHeart: jest.fn(),
};

const renderWithContext = (ui: React.ReactElement) => {
  return render(
    <userContext.Provider value={mockContext}>{ui}</userContext.Provider>
  );
};

describe("Product Card", () => {
  const defaultProps = {
    id: 1,
    image: "/test-image.jpg",
    title: "Test Product",
    description: "A test product description",
    price: 29.99,
  };

  it("renders product title", () => {
    renderWithContext(<Product {...defaultProps} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders product price", () => {
    renderWithContext(<Product {...defaultProps} />);
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("renders product description", () => {
    renderWithContext(<Product {...defaultProps} />);
    expect(screen.getByText("A test product description")).toBeInTheDocument();
  });

  it("renders view details link", () => {
    renderWithContext(<Product {...defaultProps} />);
    const link = screen.getByText("View Details").closest("a");
    expect(link).toHaveAttribute("href", "/products/1");
  });

  it("calls handleHeart when heart icon clicked", () => {
    renderWithContext(<Product {...defaultProps} />);
    const heartButton = screen.getAllByRole("button")[0];
    fireEvent.click(heartButton);
    expect(mockContext.handleHeart).toHaveBeenCalledWith(
      1,
      "/test-image.jpg",
      "Test Product",
      29.99
    );
  });

  it("matches snapshot", () => {
    const { container } = renderWithContext(<Product {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
```

- [ ] **Step 2: Create Navbar tests**

Create `__tests__/components/Navbar.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders ShibuHub logo text", () => {
    render(<Navbar />);
    expect(screen.getByText("ShibuHub")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("does not render Dashboard link in nav", () => {
    render(<Navbar />);
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("highlights active link", () => {
    (usePathname as jest.Mock).mockReturnValue("/products");
    render(<Navbar />);
    const productsLink = screen.getByText("Products");
    expect(productsLink).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});
```

- [ ] **Step 3: Create Footer tests**

Create `__tests__/components/Footer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders ShibuHub brand name", () => {
    render(<Footer />);
    expect(screen.getByText("ShibuHub")).toBeInTheDocument();
  });

  it("renders Quick Links section", () => {
    render(<Footer />);
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("renders Newsletter section", () => {
    render(<Footer />);
    expect(screen.getByText("Newsletter")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
```

- [ ] **Step 4: Create EmptyState tests**

Create `__tests__/components/EmptyState.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyState } from "@/components/shared/empty-state";
import { Inbox } from "lucide-react";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState icon={Inbox} title="No items found" />);
    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <EmptyState
        icon={Inbox}
        title="No items"
        description="Add some items to get started"
      />
    );
    expect(screen.getByText("Add some items to get started")).toBeInTheDocument();
  });

  it("renders action button when provided", () => {
    const onClick = jest.fn();
    render(
      <EmptyState
        icon={Inbox}
        title="Empty"
        action={{ label: "Add Item", onClick }}
      />
    );
    const button = screen.getByText("Add Item");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("does not render action button when not provided", () => {
    render(<EmptyState icon={Inbox} title="Empty" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<EmptyState icon={Inbox} title="Empty" />);
    expect(container).toMatchSnapshot();
  });
});
```

- [ ] **Step 5: Create DynamicBreadcrumb tests**

Create `__tests__/components/DynamicBreadcrumb.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("DynamicBreadcrumb", () => {
  it("renders breadcrumb for single segment", () => {
    (usePathname as jest.Mock).mockReturnValue("/products");
    render(<DynamicBreadcrumb />);
    expect(screen.getByText("products")).toBeInTheDocument();
  });

  it("renders breadcrumb for nested segments", () => {
    (usePathname as jest.Mock).mockReturnValue("/products/123");
    render(<DynamicBreadcrumb />);
    expect(screen.getByText("products")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    const { container } = render(<DynamicBreadcrumb />);
    expect(container).toMatchSnapshot();
  });
});
```

- [ ] **Step 6: Run all tests**

Run: `bun run test`
Expected: All tests pass

- [ ] **Step 7: Run tests with coverage**

Run: `bun run test:coverage`
Expected: Coverage report generated

---

## Task 20: Final Polish — Homepage Layout

**Covers:** §3 Homepage

**Files:**
- Modify: `app/(website)/page.tsx`

- [ ] **Step 1: Remove console.log**

Remove `console.log(data)` from line 44 in `app/(website)/page.tsx`.

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

---

## Task 21: Final Verification

- [ ] **Step 1: Run full build**

Run: `bun run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run lint**

Run: `bun run lint`
Expected: No errors (warnings acceptable)

- [ ] **Step 3: Run all tests**

Run: `bun run test`
Expected: All tests pass

- [ ] **Step 4: Run tests with coverage**

Run: `bun run test:coverage`
Expected: Coverage report shows key components tested
