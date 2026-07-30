import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("💳 Razorpay Webhook Event Received:", body.event);

    if (body.event === "payment.captured" || body.event === "order.paid") {
      const payment = body.payload?.payment?.entity;
      console.log(`✅ Subscription activated for user. Amount: ₹${(payment?.amount || 0) / 100}`);
    }

    return NextResponse.json({ success: true, message: "Webhook processed" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
