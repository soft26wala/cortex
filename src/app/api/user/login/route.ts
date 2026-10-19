import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").toString().toLowerCase().trim();
    const password = (body.password || "").toString().trim();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const endpoints = [
      "https://cortex-api-htc8.onrender.com/user/login",
      "http://localhost:4000/user/login",
    ];

    let backendResult: any = null;
    let backendStatus = 500;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          signal: AbortSignal.timeout(15000),
        });

        const json = await res.json().catch(() => ({}));
        if (res.ok && json.token) {
          backendResult = json;
          backendStatus = res.status;
          break;
        } else if (json.message || json.error) {
          backendResult = json;
          backendStatus = res.status;
          break;
        }
      } catch (err) {
        console.warn(`Login attempt to ${url} failed:`, err);
      }
    }

    if (backendResult) {
      return NextResponse.json(backendResult, { status: backendStatus });
    }

    // Fallback error
    return NextResponse.json(
      { message: "Could not reach authentication server. Please try again." },
      { status: 503 }
    );
  } catch (err: any) {
    console.error("Internal login route error:", err);
    return NextResponse.json(
      { message: err.message || "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
