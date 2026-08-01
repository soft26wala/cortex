import { NextRequest, NextResponse } from "next/server";
import { getBotAccounts, saveBotCredentials } from "@/lib/whatsapp/db";
import { getAuthenticatedUser } from "@/lib/whatsapp/auth";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const accounts = await getBotAccounts(authUser.id);
    return NextResponse.json({ success: true, userId: authUser.id, accounts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const body = await req.json();

    const account = await saveBotCredentials(authUser.id, body);
    return NextResponse.json({ success: true, userId: authUser.id, account }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
