import { NextRequest, NextResponse } from "next/server";
import { getKeywords, createKeyword, deleteKeyword } from "@/lib/whatsapp/db";
import { getAuthenticatedUser } from "@/lib/whatsapp/auth";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const keywords = await getKeywords(authUser.id);
    return NextResponse.json({ success: true, userId: authUser.id, keywords });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const body = await req.json();

    if (!body.keyword) {
      return NextResponse.json({ success: false, error: "Keyword is required" }, { status: 400 });
    }

    const rule = await createKeyword(authUser.id, body);
    return NextResponse.json({ success: true, userId: authUser.id, rule }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await deleteKeyword(authUser.id, id);
    return NextResponse.json({ success: true, userId: authUser.id, message: "Rule deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
