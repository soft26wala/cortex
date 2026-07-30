import { NextRequest, NextResponse } from "next/server";
import { RazorpayService } from "@/services/whatsapp/razorpayService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const planId = body.planId || "plan_starter";
    const userId = body.userId || "user-1";

    const orderData = await RazorpayService.createOrder(planId, userId);
    return NextResponse.json(orderData);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
