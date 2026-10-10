import { NextRequest, NextResponse } from "next/server";
import { getJeenuSocialLinks, createJeenuSocialLink } from "@/lib/db";
import { verifyJeenuAdminAuth } from "@/lib/jeenusoni/permissions";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    let activeOnly = !all;
    if (all) {
      const auth = await verifyJeenuAdminAuth(req);
      if (!auth.isAuthorized) activeOnly = true;
    }

    const socials = await getJeenuSocialLinks({ activeOnly });
    return NextResponse.json({ success: true, data: socials });
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
    if (!body.platform || !body.url) {
      return NextResponse.json(
        { success: false, error: "Platform and URL are required" },
        { status: 400 }
      );
    }

    const newLink = await createJeenuSocialLink(body);
    return NextResponse.json({ success: true, data: newLink }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
