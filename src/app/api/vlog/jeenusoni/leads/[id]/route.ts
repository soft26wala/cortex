import { NextRequest, NextResponse } from "next/server";
import { updateJeenuAdLeadStatus, deleteJeenuAdLead } from "@/lib/db";
import { verifyJeenuAdminAuth } from "@/lib/jeenusoni/permissions";

export const dynamic = "force-dynamic";

/**
 * PROTECTED (ADMIN / SONI ONLY): Update lead status
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyJeenuAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status || 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const validStatuses = ["NEW", "CONTACTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const updated = await updateJeenuAdLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Ad Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * PROTECTED (ADMIN / SONI ONLY): Delete lead record
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyJeenuAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status || 403 }
      );
    }

    const { id } = await params;
    const result = await deleteJeenuAdLead(id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
