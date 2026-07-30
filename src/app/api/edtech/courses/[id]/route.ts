import { NextRequest, NextResponse } from "next/server";
import { getEdTechCourseById } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const course = await getEdTechCourseById(resolvedParams.id);
    if (!course) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: course });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
