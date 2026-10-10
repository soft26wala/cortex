import { NextRequest, NextResponse } from "next/server";
import { getJeenuVlogs, createJeenuVlog } from "@/lib/db";
import { verifyJeenuAdminAuth } from "@/lib/jeenusoni/permissions";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const all = searchParams.get("all") === "true";

    // If requesting all (including unpublished), verify admin auth
    let publishedOnly = !all;
    if (all) {
      const auth = await verifyJeenuAdminAuth(req);
      if (!auth.isAuthorized) {
        publishedOnly = true; // Fall back to published only if unauthorized
      }
    }

    const vlogs = await getJeenuVlogs({ publishedOnly, category, search });
    return NextResponse.json({ success: true, data: vlogs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyJeenuAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status || 403 }
      );
    }

    const body = await req.json();
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Title is required for vlog entry" },
        { status: 400 }
      );
    }

    const newVlog = await createJeenuVlog(body);
    return NextResponse.json({ success: true, data: newVlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
