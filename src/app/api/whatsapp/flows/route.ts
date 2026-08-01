import { NextRequest, NextResponse } from "next/server";
import { getSavedFlows, saveFlowGraph } from "@/lib/whatsapp/db";
import { getAuthenticatedUser } from "@/lib/whatsapp/auth";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const flows = await getSavedFlows(authUser.id);
    return NextResponse.json({ success: true, userId: authUser.id, flows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const body = await req.json();
    const botId = body.botId || `bot-${authUser.id}`;

    const savedFlow = await saveFlowGraph(authUser.id, botId, {
      id: body.id,
      name: body.name || "Main WhatsApp Flow",
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
      nodes: body.nodes || [],
      edges: body.edges || []
    });

    return NextResponse.json({ success: true, userId: authUser.id, flow: savedFlow }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
