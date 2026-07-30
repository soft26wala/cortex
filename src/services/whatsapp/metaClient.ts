export interface MetaMessagePayload {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
  to: string;
  type: 'text' | 'interactive' | 'template' | 'image' | 'document';
  text?: { body: string; preview_url?: boolean };
  interactive?: any;
  template?: any;
}

export class MetaCloudAPIClient {
  private static META_BASE_URL = 'https://graph.facebook.com/v19.0';

  /**
   * Verify Phone Number ID and Access Token against Meta Graph API
   */
  static async verifyCredentials(phoneNumberId: string, accessToken: string): Promise<{ valid: boolean; error?: string; phoneInfo?: any }> {
    try {
      const url = `${this.META_BASE_URL}/${phoneNumberId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (response.ok && data.id) {
        return { valid: true, phoneInfo: data };
      } else {
        return { valid: false, error: data.error?.message || 'Invalid Meta credentials' };
      }
    } catch (e: any) {
      return { valid: false, error: e.message || 'Meta API connection failed' };
    }
  }

  /**
   * Send Text Message via Meta Graph API
   */
  static async sendTextMessage(phoneNumberId: string, accessToken: string, to: string, text: string) {
    const payload: MetaMessagePayload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { body: text, preview_url: true }
    };
    return this.postToMeta(phoneNumberId, accessToken, payload);
  }

  /**
   * Send Interactive Quick Reply Buttons
   */
  static async sendButtonMessage(phoneNumberId: string, accessToken: string, to: string, text: string, buttons: { id: string; title: string }[]) {
    const payload: MetaMessagePayload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text },
        action: {
          buttons: buttons.map(b => ({
            type: 'reply',
            reply: { id: b.id, title: b.title.slice(0, 20) }
          }))
        }
      }
    };
    return this.postToMeta(phoneNumberId, accessToken, payload);
  }

  /**
   * Send Interactive List Menu
   */
  static async sendListMessage(
    phoneNumberId: string,
    accessToken: string,
    to: string,
    text: string,
    buttonText: string,
    sections: { title: string; rows: { id: string; title: string; description?: string }[] }[]
  ) {
    const payload: MetaMessagePayload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'interactive',
      interactive: {
        type: 'list',
        header: { type: 'text', text: 'Select Option' },
        body: { text },
        action: {
          button: buttonText.slice(0, 20),
          sections
        }
      }
    };
    return this.postToMeta(phoneNumberId, accessToken, payload);
  }

  /**
   * Send Official Meta Template Message
   */
  static async sendTemplateMessage(
    phoneNumberId: string,
    accessToken: string,
    to: string,
    templateName: string,
    languageCode: string = 'en_US',
    components?: any[]
  ) {
    const payload: MetaMessagePayload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode },
        components: components || []
      }
    };
    return this.postToMeta(phoneNumberId, accessToken, payload);
  }

  /**
   * Mark Message as Read (Blue Tick)
   */
  static async markMessageAsRead(phoneNumberId: string, accessToken: string, waMessageId: string) {
    try {
      const url = `${this.META_BASE_URL}/${phoneNumberId}/messages`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: waMessageId
        })
      });
    } catch (e) {
      console.warn("Failed to mark message as read:", e);
    }
  }

  private static async postToMeta(phoneNumberId: string, accessToken: string, payload: MetaMessagePayload) {
    try {
      const url = `${this.META_BASE_URL}/${phoneNumberId}/messages`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Meta Cloud API Error:", data);
        return { success: false, error: data.error?.message || 'Meta API call failed', data };
      }
      return { success: true, messageId: data.messages?.[0]?.id, data };
    } catch (e: any) {
      console.error("Meta Network Error:", e);
      return { success: false, error: e.message || 'Network error communicating with Meta API' };
    }
  }
}
