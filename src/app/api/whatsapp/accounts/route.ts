import { NextRequest, NextResponse } from "next/server";
import { getBotAccounts } from "@/lib/whatsapp/db";

export async function GET() {
  try {
    const accounts = await getBotAccounts();
    return NextResponse.json({ success: true, accounts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
