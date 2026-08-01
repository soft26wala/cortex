import { NextRequest, NextResponse } from "next/server";
import { matchAndProcessMessage } from "@/lib/whatsapp/db";
import { getAuthenticatedUser } from "@/lib/whatsapp/auth";

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const body = await req.json();
    const botId = body.botId || `bot-${authUser.id}`;
    const text = body.text || "";
    const sender = body.sender || "+91 98765 00000";

    const result = await matchAndProcessMessage(authUser.id, botId, text, sender);
    return NextResponse.json({ success: true, userId: authUser.id, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
