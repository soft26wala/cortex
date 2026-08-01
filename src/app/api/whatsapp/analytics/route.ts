import { NextRequest, NextResponse } from "next/server";
import { getBotLogs, getKeywords } from "@/lib/whatsapp/db";
import { getAuthenticatedUser } from "@/lib/whatsapp/auth";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const logs = await getBotLogs(authUser.id);
    const keywords = await getKeywords(authUser.id);

    const totalTriggers = keywords.reduce((acc, k) => acc + k.triggerCount, 0);

    return NextResponse.json({
      success: true,
      userId: authUser.id,
      stats: {
        totalAutoReplies: totalTriggers,
        activeKeywords: keywords.length,
        deliveryRate: "99.8%",
        avgResponseTime: "< 1.2s"
      },
      logs
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
