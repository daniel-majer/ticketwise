// /app/api/auth/user/route.ts 
import { NextResponse } from "next/server";

import { getAuth } from "@/features/auth/queries/cookie";

export async function GET() {
  const { user } = await getAuth();
  return NextResponse.json({ user });
}
