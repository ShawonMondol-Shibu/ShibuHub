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
            <Card key={service.id} className="rounded-xl border-border hover:shadow-lg transition-all duration-300 text-center">
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
