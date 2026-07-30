import { NextRequest, NextResponse } from "next/server";
import { getNewsList, createNewsArticle } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined;

    const news = await getNewsList({ category, search, limit });
    return NextResponse.json({ success: true, data: news });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }

    const newArticle = await createNewsArticle(body);
    return NextResponse.json({ success: true, data: newArticle }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
