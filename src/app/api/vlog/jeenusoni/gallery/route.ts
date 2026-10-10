import { NextRequest, NextResponse } from "next/server";
import { getJeenuGalleries, createJeenuGallery } from "@/lib/db";
import { verifyJeenuAdminAuth } from "@/lib/jeenusoni/permissions";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    let publishedOnly = !all;
    if (all) {
      const auth = await verifyJeenuAdminAuth(req);
      if (!auth.isAuthorized) publishedOnly = true;
    }

    const gallery = await getJeenuGalleries({ publishedOnly });
    return NextResponse.json({ success: true, data: gallery });
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
    if (!body.imageUrl) {
      return NextResponse.json(
        { success: false, error: "Image URL is required" },
        { status: 400 }
      );
    }

    const newItem = await createJeenuGallery(body);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
