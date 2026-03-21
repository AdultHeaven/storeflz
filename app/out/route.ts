// app/out/route.ts
import { NextResponse } from "next/server";

export function GET() {
  const target =
    "https://roomsmergeshipwreck.com/mi2s67uf8m?key=035ff8cf9ce79ba1d043006022dcb0d5";

  return NextResponse.redirect(target, { status: 302 });
}