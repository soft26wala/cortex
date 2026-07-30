import { NextRequest, NextResponse } from "next/server";
import { getEdTechStats } from "@/lib/db";

export async function GET() {
  try {
    const stats = await getEdTechStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
