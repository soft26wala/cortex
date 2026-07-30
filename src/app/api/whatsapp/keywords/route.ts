import { NextRequest, NextResponse } from "next/server";
import { getKeywords, createKeyword, deleteKeyword } from "@/lib/whatsapp/db";

export async function GET() {
  try {
    const keywords = await getKeywords();
    return NextResponse.json({ success: true, keywords });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.keyword) {
      return NextResponse.json({ success: false, error: "Keyword is required" }, { status: 400 });
    }

    const rule = await createKeyword(body);
    return NextResponse.json({ success: true, rule }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }
    await deleteKeyword(id);
    return NextResponse.json({ success: true, message: "Rule deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
