import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { db } from "@/drizzle/db";
import { orders, orderItems } from "@/drizzle/schema";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items }: { items: CartItem[] } = await request.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items" }, { status: 400 });
  }

  const stripeSession = await getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: session.user.email,
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
    metadata: {
      userId: session.user.id,
    },
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [order] = await db
    .insert(orders)
    .values({
      userId: session.user.id,
      total: total.toFixed(2),
      status: "pending",
      stripeSessionId: stripeSession.id,
    })
    .returning();

  if (order) {
    await db.insert(orderItems).values(
      items.map((item) => ({
        orderId: order.id,
        productId: item.id,
        name: item.name,
        image: item.image,
        price: item.price.toFixed(2),
        quantity: item.quantity,
      }))
    );
  }

  return NextResponse.json({ url: stripeSession.url });
}
