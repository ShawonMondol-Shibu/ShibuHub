"use client";

import { shipping_services } from "@/components/services/shipping";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ShippingCards() {
  return (
    <main className="mt-40">
      <CardTitle className="text-center text-5xl">
        Shipping & Delivery Services
      </CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-10">
        {shipping_services.map((service) => (
          <Card
            key={service.id}
            className="rounded-2xl shadow-none border-none hover:shadow-xl transition duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">
                {service.name}
              </CardTitle>
              <CardDescription className="text-center">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="font-medium text-gray-700">⏱ {service.duration}</p>
              <p className="font-semibold text-blue-600">💰 {service.cost}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
