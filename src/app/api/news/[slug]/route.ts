import { NextRequest, NextResponse } from "next/server";
import { getNewsBySlug, updateNewsArticle, deleteNewsArticle } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    const article = await getNewsBySlug(resolvedParams.slug);
    if (!article) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    const updated = await updateNewsArticle(resolvedParams.slug, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    await deleteNewsArticle(resolvedParams.slug);
    return NextResponse.json({ success: true, message: "Article deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
