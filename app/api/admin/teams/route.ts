import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || (session.user.role !== "admin" && session.user.role !== "manager")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teamMembers = await db
    .select()
    .from(user)
    .where(eq(user.role, "staff"))
    .orderBy(desc(user.createdAt));

  return NextResponse.json(teamMembers);
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || (session.user.role !== "admin" && session.user.role !== "manager")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, email, password } = body;

  const member = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password: password || "changeme123",
    },
  });

  return NextResponse.json(member, { status: 201 });
}
