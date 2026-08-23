import { NextRequest, NextResponse } from "next/server";
import { getTeamMembers, createTeamMember } from "@/lib/db";

export async function GET() {
  try {
    const team = await getTeamMembers();
    return NextResponse.json({ success: true, data: team });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.primaryRole) {
      return NextResponse.json(
        { success: false, error: "Name and Primary Role are required" },
        { status: 400 }
      );
    }

    const newMember = await createTeamMember(body);
    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
