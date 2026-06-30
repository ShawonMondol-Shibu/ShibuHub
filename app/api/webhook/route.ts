import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    await db
      .update(orders)
      .set({
        status: "processing",
        stripePaymentIntentId: session.payment_intent as string,
        updatedAt: new Date(),
      })
      .where(eq(orders.stripeSessionId, session.id));
  }

  return NextResponse.json({ received: true });
}
