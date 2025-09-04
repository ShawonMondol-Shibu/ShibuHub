"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Product from "@/components/layout/Product";

type ProductType = {
  id: number;
  image: string;
  title: string;
  price: number;
  model?: string;
  description: string;
  category?: string;
  brand?: string;
};

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
};

const fetchProduct = async (id: string): Promise<ProductType> => {
  const res = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await res.json();
  return data.product;
};

const fetchSimilarProducts = async (): Promise<ProductType[]> => {
  const res = await fetch("https://fakestoreapi.in/api/products?limit=4");
  if (!res.ok) {
    throw new Error("Failed to fetch similar products");
  }
  const data = await res.json();
  return data.products;
};

const dummyReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely love this product! The quality is outstanding and it arrived faster than expected.",
    date: "2024-01-15",
    avatar: "/diverse-woman-portrait.png",
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    comment:
      "Great value for money. Works exactly as described. Would definitely recommend to others.",
    date: "2024-01-10",
    avatar: "/thoughtful-man.png",
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 5,
    comment:
      "Perfect! This exceeded my expectations. The design is beautiful and very functional.",
    date: "2024-01-08",
    avatar: "/woman-2.jpg",
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => fetchProduct(params.id),
  });

  const { data: similarProducts } = useQuery({
    queryKey: ["similar-products"],
    queryFn: fetchSimilarProducts,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <p className="text-destructive">
            Failed to load product. Please try again.
          </p>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <p>Product not found.</p>
        </Card>
      </div>
    );
  }

  const { image, title, price, model, description, category, brand } = product;
  const averageRating =
    dummyReviews.reduce((acc, review) => acc + review.rating, 0) /
    dummyReviews.length;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <Image
                src={
                  image || "/placeholder.svg?height=600&width=600&query=product"
                }
                alt={title}
                fill
                className="object-cover transition-transform hover:scale-105 duration-300"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {category && (
                <Badge variant="secondary" className="mb-2">
                  {category}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-balance mb-2">{title}</h1>
              {model && (
                <p className="text-muted-foreground text-lg">{model}</p>
              )}
              {brand && (
                <p className="text-sm text-muted-foreground">by {brand}</p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({dummyReviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-primary">
              ${price.toFixed(2)}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  Free Shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />2 Year Warranty
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RotateCcw className="h-4 w-4" />
                  30 Day Returns
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Customer Reviews
              <Badge variant="secondary">{dummyReviews.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {dummyReviews.map((review, index) => (
              <div key={review.id}>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                    />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{review.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
                {index < dummyReviews.length - 1 && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {similarProducts && similarProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Similar Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.slice(0, 4).map((similarProduct) => {
                  const { id, image, title, description, price } =
                    similarProduct;
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
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
