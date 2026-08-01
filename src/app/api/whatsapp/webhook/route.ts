import { NextRequest, NextResponse } from "next/server";
import { matchAndProcessMessage, getBotAccounts } from "@/lib/whatsapp/db";
import { MetaCloudAPIClient } from "@/services/whatsapp/metaClient";

const DEFAULT_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'cortex_whatsapp_verify_secret_2026';

/**
 * GET: Meta Webhook Verification Endpoint
 * Meta sends GET request when registering webhook URL in Meta Developers Portal
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode === "subscribe" && token) {
      // Check verify token
      console.log(`✅ Meta Webhook Verification Request Received. Token: ${token}`);
      return new Response(challenge, { status: 200 });
    }

    return NextResponse.json({ success: false, error: "Invalid verification request" }, { status: 403 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * POST: Meta Webhook Incoming Message Ingestion Endpoint
 * Meta posts real-time events when customer sends message to registered phone number
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verify payload is from whatsapp business account
    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const metadata = value?.metadata;
      const messages = value?.messages;

      if (messages && messages.length > 0) {
        const message = messages[0];
        const from = message.from; // Customer WhatsApp Number (e.g., 919876543210)
        const waMessageId = message.id;
        const phoneNumberId = metadata?.phone_number_id;

        let incomingText = "";

        if (message.type === "text") {
          incomingText = message.text?.body || "";
        } else if (message.type === "interactive") {
          if (message.interactive?.type === "button_reply") {
            incomingText = message.interactive.button_reply.title || message.interactive.button_reply.id;
          } else if (message.interactive?.type === "list_reply") {
            incomingText = message.interactive.list_reply.title || message.interactive.list_reply.id;
          }
        }

        if (incomingText) {
          console.log(`📩 Webhook Ingested message from ${from}: "${incomingText}"`);

          // Process Auto Reply via Rule Engine
          const result = await matchAndProcessMessage("user-1", "bot-1", incomingText, `+${from}`);

          // If valid Meta credentials exist, send message via Meta Graph API
          const accessToken = process.env.META_ACCESS_TOKEN;
          if (accessToken && phoneNumberId) {
            const resp = result.response;
            if (resp.buttons) {
              await MetaCloudAPIClient.sendButtonMessage(phoneNumberId, accessToken, from, resp.text, resp.buttons);
            } else {
              await MetaCloudAPIClient.sendTextMessage(phoneNumberId, accessToken, from, resp.text || "Thank you for contacting us.");
            }

            // Mark message as read (Blue tick)
            await MetaCloudAPIClient.markMessageAsRead(phoneNumberId, accessToken, waMessageId);
          }
        }
      }

      return NextResponse.json({ success: true, message: "EVENT_RECEIVED" }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: "Not a WhatsApp event" }, { status: 404 });
  } catch (error: any) {
    console.error("Meta Webhook processing error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
