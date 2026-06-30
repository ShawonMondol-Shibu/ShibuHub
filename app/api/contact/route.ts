import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { contactMessages } from "@/drizzle/schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  await db.insert(contactMessages).values({
    name,
    email,
    phone: phone || null,
    message,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
