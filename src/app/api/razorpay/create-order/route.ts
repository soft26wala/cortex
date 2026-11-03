import { NextRequest, NextResponse } from "next/server";
import { RazorpayService, SAAS_PLANS } from "@/services/whatsapp/razorpayService";
import { getAuthenticatedUser } from "@/lib/whatsapp/auth";
import { activateUserSubscription } from "@/lib/whatsapp/db";

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const body = await req.json();
    const planId = body.planId || "plan_starter";

    const planObj = SAAS_PLANS.find(p => p.id === planId) || SAAS_PLANS[0];
    const orderData = await RazorpayService.createOrder(planId, authUser.id);

    // Note: Subscription will be activated upon verified payment confirmation in webhook/verify endpoint

    return NextResponse.json({
      ...orderData,
      userId: authUser.id,
      });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
