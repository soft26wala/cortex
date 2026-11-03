import { NextRequest } from "next/server";
import crypto from "crypto";
import { getToken } from "next-auth/jwt";

export const ALLOWED_JEENU_ROLES = ["ADMIN", "SONI", "SUPER ADMIN", "SUPERADMIN"];
const JEENU_AUTH_SECRET = process.env.JEENU_AUTH_SECRET || "jeenu_soni_luxury_vlog_secret_key_2026";

export interface JeenuUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthCheckResult {
  isAuthenticated: boolean;
  isAuthorized: boolean;
  role: string;
  user: JeenuUser | null;
  error?: string;
  status?: number;
}

/**
 * Sign a secure session token for Jeenu Soni Admin / Soni role
 */
export function signJeenuToken(payload: { id: string; name: string; email: string; role: string; exp?: number }): string {
  const data = JSON.stringify({
    ...payload,
    role: payload.role.toUpperCase(),
    exp: payload.exp || Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  const b64Data = Buffer.from(data).toString("base64url");
  const signature = crypto.createHmac("sha256", JEENU_AUTH_SECRET).update(b64Data).digest("base64url");
  return `${b64Data}.${signature}`;
}

/**
 * Verify a signed Jeenu token
 */
export function verifyJeenuToken(token: string): { valid: boolean; user?: JeenuUser } {
  if (!token || !token.includes(".")) return { valid: false };
  const parts = token.split(".");

  // 1. If 3-part standard JWT (from Cortex backend or NextAuth)
  if (parts.length === 3) {
    try {
      const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));
      const role = (payload.role || "").toString().toUpperCase().trim();
      const email = (payload.email || "").toString().toLowerCase().trim();
      const isAdmin = email === "anmolsingh26ff@gmail.com" || email === "anmol@cortexwebsolutions.com" || role === "ADMIN";
      const finalRole = isAdmin ? "ADMIN" : (role || "USER");

      return {
        valid: true,
        user: {
          id: payload.id || payload._id || payload.userId || "usr_cortex",
          name: payload.name || payload.username || (finalRole === "SONI" ? "Jeenu Soni" : "User"),
          email: payload.email || `${finalRole.toLowerCase()}@cortex.com`,
          role: finalRole,
        },
      };
    } catch {
      // ignore
    }
  }

  // 2. If 2-part Jeenu HMAC token
  if (parts.length === 2) {
    const [b64Data, signature] = parts;
    const expectedSig = crypto.createHmac("sha256", JEENU_AUTH_SECRET).update(b64Data).digest("base64url");
    if (signature !== expectedSig) return { valid: false };

    try {
      const payload = JSON.parse(Buffer.from(b64Data, "base64url").toString("utf-8"));
      if (payload.exp && Date.now() > payload.exp) return { valid: false };
      return {
        valid: true,
        user: {
          id: payload.id || "usr_jeenu",
          name: payload.name || "Authorized User",
          email: payload.email || "user@cortex.com",
          role: (payload.role || "").toUpperCase(),
        },
      };
    } catch {
      return { valid: false };
    }
  }

  return { valid: false };
}

/**
 * Server-side authorization checker for Jeenu Soni operations.
 * Recognizes any unified login from cortestack.com (NextAuth session cookies, JWT bearer tokens, jeenu_session).
 * Distinguishes isAuthenticated (user is logged in) vs isAuthorized (role is strictly ADMIN or SONI).
 */
export async function verifyJeenuAdminAuth(req?: NextRequest): Promise<AuthCheckResult> {
  let role = "GUEST";
  let userId = "guest";
  let email = "guest@cortex.com";
  let name = "Guest User";
  let isAuthenticated = false;

  if (req) {
    // 1. Check NextAuth session token from cookies (cortestack.com unified session)
    try {
      const secret = (process.env.NEXTAUTH_SECRET || "").trim() || "073rWYtEaQ/DWi6vh48Cdh/LN2Yy7mcdxPPfRBsjgQJLJWjyaUtxhCoEsos=";
      const nextAuthToken = await getToken({ req: req as any, secret });
      if (nextAuthToken) {
        const nextEmail = (nextAuthToken.email || "").toString().toLowerCase().trim();
        const nextRole = ((nextAuthToken as any).role || "").toString().toUpperCase().trim();
        const isMasterAdmin = nextEmail === "anmolsingh26ff@gmail.com" || nextEmail === "anmol@cortexwebsolutions.com";

        role = isMasterAdmin ? "ADMIN" : (nextRole || "USER");
        userId = (nextAuthToken.sub || (nextAuthToken as any).id || "usr_nextauth").toString();
        name = nextAuthToken.name || (role === "SONI" ? "Jeenu Soni" : "User");
        email = nextAuthToken.email || nextEmail;
        isAuthenticated = true;
      }
    } catch (e) {
      console.warn("NextAuth token extraction note:", e);
    }

    // 2. Check signed cookie `jeenu_session`
    if (!isAuthenticated) {
      const sessionCookie = req.cookies.get("jeenu_session")?.value;
      if (sessionCookie) {
        const verified = verifyJeenuToken(sessionCookie);
        if (verified.valid && verified.user) {
          role = verified.user.role;
          userId = verified.user.id;
          email = verified.user.email;
          name = verified.user.name;
          isAuthenticated = true;
        }
      }
    }

    // 3. Check Authorization Bearer Token header
    if (!isAuthenticated) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7).trim();
        const verified = verifyJeenuToken(token);
        if (verified.valid && verified.user) {
          role = verified.user.role;
          userId = verified.user.id;
          email = verified.user.email;
          name = verified.user.name;
          isAuthenticated = true;
        }
      }
    }

    // 4. Check cortex_role cookie or x-user-role header
    if (!isAuthenticated) {
      const cortexRole = req.cookies.get("cortex_role")?.value || req.cookies.get("user_role")?.value;
      const headerRole = req.headers.get("x-user-role");
      const potentialRole = (cortexRole || headerRole || "").toUpperCase().trim();

      if (potentialRole) {
        role = potentialRole;
        userId = req.headers.get("x-user-id") || (potentialRole === "SONI" ? "usr_soni_01" : potentialRole === "ADMIN" ? "usr_admin_01" : "usr_guest");
        email = req.headers.get("x-user-email") || (potentialRole === "SONI" ? "soni@cortex.com" : potentialRole === "ADMIN" ? "admin@cortex.com" : "user@cortex.com");
        name = req.headers.get("x-user-name") || (potentialRole === "SONI" ? "Jeenu Soni" : potentialRole === "ADMIN" ? "Cortex Admin" : "User");
        isAuthenticated = true;
      }
    }
  }

  // Normalize role and check master admin emails
  const cleanEmail = (email || "").toLowerCase().trim();
  if (cleanEmail === "anmolsingh26ff@gmail.com" || cleanEmail === "anmol@cortexwebsolutions.com") {
    role = "ADMIN";
  }
  const normalizedRole = (role || "").trim().toUpperCase();
  const isAllowed = isAuthenticated && ALLOWED_JEENU_ROLES.includes(normalizedRole);

  if (!isAuthenticated) {
    return {
      isAuthenticated: false,
      isAuthorized: false,
      role: "GUEST",
      user: null,
      error: "Please sign in to access this feature",
      status: 401,
    };
  }

  return {
    isAuthenticated: true,
    isAuthorized: isAllowed,
    role: normalizedRole || "USER",
    user: {
      id: userId,
      email,
      name,
      role: normalizedRole || "USER",
    },
    error: !isAllowed
      ? `Access Denied: Only users with ADMIN or SONI role can edit Jeenu Soni content. (Detected role: '${normalizedRole || "USER"}')`
      : undefined,
    status: !isAllowed ? 403 : 200,
  };
}
