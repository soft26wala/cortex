import { NextRequest, NextResponse } from "next/server";
import { getEdTechCourses, createEdTechCourse } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;

    const courses = await getEdTechCourses({ category, search });
    return NextResponse.json({ success: true, data: courses });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: "Course title required" }, { status: 400 });
    }

    const newCourse = await createEdTechCourse(body);
    return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
