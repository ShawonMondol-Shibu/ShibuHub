import React from "react";
import Electronics from "./Electronics";
import ShippingCards from "./Shipping";

export default function Services() {
  return (
    <div className="container m-auto mt-60">
      <Electronics />
      <ShippingCards />
    </div>
  );
}
