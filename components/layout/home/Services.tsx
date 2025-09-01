import React from "react";
import Electronics from "./Electronics";
import ShippingCards from "./Shipping";

export default function Services() {
  return (
    <div className="container m-auto mt-40 pt-40 h-screen">
      <Electronics />
      <ShippingCards />
    </div>
  );
}
