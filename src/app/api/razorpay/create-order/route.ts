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

    // Auto-activate subscription bound to authenticated user_id
    const subscription = await activateUserSubscription(authUser.id, planObj.id, planObj.name, {
      orderId: orderData.order.id,
      amount: planObj.priceInr
    });

    return NextResponse.json({
      ...orderData,
      userId: authUser.id,
      subscription
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
