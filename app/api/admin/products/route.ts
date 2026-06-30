import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || (session.user.role !== "admin" && session.user.role !== "manager")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt));

  return NextResponse.json(allProducts);
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || (session.user.role !== "admin" && session.user.role !== "manager")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, description, price, categoryId, brand, model, stock, images } = body;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const [product] = await db
    .insert(products)
    .values({
      name,
      slug: `${slug}-${Date.now()}`,
      description,
      price: price.toFixed(2),
      categoryId: categoryId || null,
      brand: brand || null,
      model: model || null,
      stock: stock || 0,
      images: images || [],
    })
    .returning();

  return NextResponse.json(product, { status: 201 });
}
