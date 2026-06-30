import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/drizzle/db";
import { orders, products, user } from "@/drizzle/schema";
import { count, sum, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || (session.user.role !== "admin" && session.user.role !== "manager")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const totalOrders = await db.select({ value: count() }).from(orders);
  const totalProducts = await db.select({ value: count() }).from(products);
  const totalCustomers = await db.select({ value: count() }).from(user);
  const totalRevenue = await db
    .select({ value: sum(orders.total) })
    .from(orders)
    .where(eq(orders.status, "processing"));

  return NextResponse.json({
    totalOrders: totalOrders[0]?.value ?? 0,
    totalProducts: totalProducts[0]?.value ?? 0,
    totalCustomers: totalCustomers[0]?.value ?? 0,
    totalRevenue: totalRevenue[0]?.value ?? "0",
  });
}
