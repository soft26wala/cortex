import { NextRequest, NextResponse } from "next/server";
import { getJeenuAdLeads, createJeenuAdLead } from "@/lib/db";
import { verifyJeenuAdminAuth } from "@/lib/jeenusoni/permissions";
import { validateAdLeadForm } from "@/lib/jeenusoni/validations";

export const dynamic = "force-dynamic";

/**
 * PUBLIC: Submit an advertisement lead / collaboration request
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Perform validation and anti-spam sanitization
    const validation = validateAdLeadForm(body);
    if (!validation.isValid || !validation.sanitizedData) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please fix the highlighted fields.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Insert sanitized lead into DB
    const newLead = await createJeenuAdLead(validation.sanitizedData);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your request has been received.",
        data: { id: newLead.id, createdAt: newLead.createdAt },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * PROTECTED (ADMIN / SONI ONLY): List ad leads with search & status filters
 */
export async function GET(req: NextRequest) {
  try {
    const auth = await verifyJeenuAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status || 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const leads = await getJeenuAdLeads({ status, search });
    return NextResponse.json({ success: true, data: leads });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
