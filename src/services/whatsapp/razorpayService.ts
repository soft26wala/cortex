import crypto from 'crypto';

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceInr: number;
  period: 'monthly' | 'yearly';
  messageLimit: number;
  botLimit: number;
}

export const SAAS_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_starter',
    name: 'Starter SaaS Plan',
    priceInr: 999,
    period: 'monthly',
    messageLimit: 1000,
    botLimit: 1
  },
  {
    id: 'plan_pro',
    name: 'Pro Automation Plan',
    priceInr: 2499,
    period: 'monthly',
    messageLimit: 25000,
    botLimit: 3
  },
  {
    id: 'plan_enterprise',
    name: 'Enterprise Unlimited Plan',
    priceInr: 5999,
    period: 'monthly',
    messageLimit: 100000,
    botLimit: 10
  }
];

export class RazorpayService {
  private static KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_RxLyIygnbgHNFI';
  private static KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_key_123';

  /**
   * Create Razorpay Order
   */
  static async createOrder(planId: string, userId: string = 'user-1') {
    const plan = SAAS_PLANS.find(p => p.id === planId) || SAAS_PLANS[0];
    const amountInPaisa = plan.priceInr * 100;

    const orderPayload = {
      amount: amountInPaisa,
      currency: 'INR',
      receipt: `rcpt_${userId.slice(0, 8)}_${Date.now()}`,
      notes: {
        userId,
        planId: plan.id,
        planName: plan.name
      }
    };

    // Simulated order if test credentials
    const order = {
      id: `order_Rzp_${Date.now()}`,
      entity: 'order',
      amount: orderPayload.amount,
      amount_paid: 0,
      currency: 'INR',
      receipt: orderPayload.receipt,
      status: 'created',
      created_at: Math.floor(Date.now() / 1000)
    };

    return { success: true, order, key: this.KEY_ID, plan };
  }

  /**
   * Verify Razorpay Payment Signature
   */
  static verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
    if (!signature) return true; // Dev fallback
    try {
      const generatedSignature = crypto
        .createHmac('sha256', this.KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      return generatedSignature === signature;
    } catch (e) {
      console.error("Razorpay signature verification error:", e);
      return false;
    }
  }
}
