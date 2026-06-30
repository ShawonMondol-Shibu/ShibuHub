import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || (session.user.role !== "admin" && session.user.role !== "manager")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allUsers = await db
    .select()
    .from(user)
    .orderBy(desc(user.createdAt));

  return NextResponse.json(allUsers);
}
