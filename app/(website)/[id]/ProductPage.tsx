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
import { useContext } from "react";
import { Toaster } from "sonner";
import { userContext } from "@/components/context/contextProvider";
import { cn } from "@/lib/utils";
import { dummyReviews } from "./reviews";

type ProductPageProps = {
  id: string;
};

type ProductType = {
  id: number;
  image: string;
  title: string;
  price: number;
  model?: string;
  description: string;
  category?: string;
  brand?: string;
  rating: { rate: number; count: number };
};

const fetchProduct = async (id: string): Promise<ProductType> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  const data = await res.json();
  return data;
};

const fetchSimilarProducts = async (): Promise<ProductType[]> => {
  const res = await fetch("https://fakestoreapi.com/products");

  return res.json();
};

export default function ProductPage({ id: pageId }: ProductPageProps) {
  const { carts, hearts, handleCart, handleHeart } = useContext(userContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", pageId],
    queryFn: () => fetchProduct(pageId),
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

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <p>Product not found.</p>
        </Card>
      </div>
    );
  }

  const {
    id,
    image,
    title,
    price,
    model,
    description,
    category,
    brand,
    rating,
  } = data;

  const isHeart = hearts.find((item: number) => item === data.id);
  const isCart = carts.find((carts:{id:number})=>carts.id === id);
  console.log(isCart);

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
                fill
                alt={title}
                className="object-contain transition-transform hover:scale-105 duration-300"
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
              <h1 id="title" className="text-3xl font-bold text-balance mb-2">
                {title}
              </h1>
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
                      i < Math.floor(rating?.rate)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {rating?.rate.toFixed(1)} ({rating?.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-indigo-500">
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
              <div className="flex gap-3 items-center">
                <Button
                  variant={isCart ? "outline" : "default"}
                  size="lg"
                  disabled={isCart ? true : false}
                  onClick={() => handleCart(id, image, title, price)}
                  className={
                    ""
                    // "flex-1 group-hover:bg-indigo-500 bg-indigo-500 hover:bg-indigo-500  border-none group-hover:shadow-xl group-hover:shadow-indigo-500 hover:text-white text-white"
                  }
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isCart ? "Cart Added" : "Add to Cart"}
                </Button>

                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => handleHeart(data.id)}
                >
                  <Heart
                    className={cn(
                      "size-6",
                      isHeart
                        ? "drop-shadow-sm drop-shadow-red-500 fill-red-500 stroke-red-500"
                        : "stroke-2",
                    )}
                  />
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

        {/* Reviews */}
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

        {/* Similar Products */}
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

      <Toaster richColors />
    </main>
  );
}
