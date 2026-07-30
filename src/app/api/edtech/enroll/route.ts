import { NextRequest, NextResponse } from "next/server";
import { enrollStudent } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.courseId) {
      return NextResponse.json({ success: false, error: "Course ID is required" }, { status: 400 });
    }

    const result = await enrollStudent({
      userId: body.userId || "student-1",
      courseId: body.courseId,
      amount: Number(body.amount || 2999),
      paymentId: body.paymentId || `pay_rzp_${Date.now()}`
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
