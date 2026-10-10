import { NextRequest, NextResponse } from "next/server";
import { getJeenuProfile, updateJeenuProfile } from "@/lib/db";
import { verifyJeenuAdminAuth } from "@/lib/jeenusoni/permissions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const profile = await getJeenuProfile("jeenusoni");
    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyJeenuAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status || 403 }
      );
    }

    const body = await req.json();
    const updated = await updateJeenuProfile(body, "jeenusoni");
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
