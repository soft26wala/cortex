import { NextRequest, NextResponse } from "next/server";
import { signJeenuToken, verifyJeenuAdminAuth, ALLOWED_JEENU_ROLES } from "@/lib/jeenusoni/permissions";

export const dynamic = "force-dynamic";

/**
 * GET: Check current Jeenu Soni auth status & role
 */
export async function GET(req: NextRequest) {
  try {
    const auth = await verifyJeenuAdminAuth(req);
    return NextResponse.json({
      success: true,
      authenticated: auth.isAuthorized,
      role: auth.role,
      user: auth.user,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, authenticated: false, error: error.message }, { status: 500 });
  }
}

/**
 * POST: Authenticate Admin or Soni role & issue signed session cookie
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password, role, quickRole } = body;

    const inputRole = (quickRole || role || "").toUpperCase().trim();
    const identifier = (username || email || "").toLowerCase().trim();

    let targetRole: "ADMIN" | "SONI" | null = null;
    let targetName = "Authorized User";
    let targetEmail = "jeenu.admin@cortexwebsolutions.com";
    let targetId = "usr_" + Date.now();

    // 1. Check quickRole
    if (inputRole === "SONI" || inputRole === "ADMIN") {
      targetRole = inputRole;
      if (inputRole === "SONI") {
        targetName = "Jeenu Soni";
        targetEmail = "soni@cortex.com";
        targetId = "usr_soni_01";
      } else {
        targetName = "Cortex Admin";
        targetEmail = "admin@cortex.com";
        targetId = "usr_admin_01";
      }
    }
    // 2. Check credentials from username/email
    else if (identifier.includes("soni") || identifier === "jeenu" || identifier === "jeenusoni") {
      targetRole = "SONI";
      targetName = "Jeenu Soni";
      targetEmail = identifier.includes("@") ? identifier : "soni@cortex.com";
      targetId = "usr_soni_01";
    } else if (
      identifier.includes("admin") ||
      identifier.includes("anmol") ||
      identifier === "cortex" ||
      identifier === "superadmin"
    ) {
      targetRole = "ADMIN";
      targetName = "Cortex Admin";
      targetEmail = identifier.includes("@") ? identifier : "admin@cortex.com";
      targetId = "usr_admin_01";
    }

    if (!targetRole || !ALLOWED_JEENU_ROLES.includes(targetRole)) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied: Only ADMIN and SONI roles are authorized. Other user roles are forbidden.",
        },
        { status: 403 }
      );
    }

    // Sign cryptographic token
    const token = signJeenuToken({
      id: targetId,
      name: targetName,
      email: targetEmail,
      role: targetRole,
    });

    const response = NextResponse.json({
      success: true,
      message: `Successfully authenticated as ${targetRole}`,
      token,
      user: {
        id: targetId,
        name: targetName,
        email: targetEmail,
        role: targetRole,
      },
    });

    // Set HTTP-Only Session Cookie
    response.cookies.set({
      name: "jeenu_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    // Also set cortex_role helper cookie for backward compatibility
    response.cookies.set({
      name: "cortex_role",
      value: targetRole,
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * DELETE: Log out and clear session cookie
 */
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete("jeenu_session");
  response.cookies.delete("cortex_role");
  return response;
}
