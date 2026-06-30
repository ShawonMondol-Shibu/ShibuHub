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
