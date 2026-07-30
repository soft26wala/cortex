import { NextRequest, NextResponse } from "next/server";
import { matchAndProcessMessage } from "@/lib/whatsapp/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const botId = body.botId || "bot-1";
    const text = body.text || "";
    const sender = body.sender || "+91 98765 00000";

    const result = await matchAndProcessMessage(botId, text, sender);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
