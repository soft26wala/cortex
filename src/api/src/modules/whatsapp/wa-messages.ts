// src/modules/whatsapp/wa-messages.ts
import { logger } from '../../../shared/logger'

const WA_VERSION = 'v20.0'

export class WAMessages {
  private baseUrl: string

  constructor(private client: { phone_number_id: string; access_token: string }) {
    this.baseUrl = `https://graph.facebook.com/${WA_VERSION}/${client.phone_number_id}/messages`
  }

  private async send(payload: object): Promise<any> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.client.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      logger.error({ err, payload }, 'WhatsApp API error')
      throw new Error(err.error?.message ?? 'WA send failed')
    }
    return res.json()
  }

  async sendText(to: string, text: string): Promise<any> {
    return this.send({
      messaging_product: 'whatsapp', recipient_type: 'individual', to,
      type: 'text', text: { body: text, preview_url: false }
    })
  }

  async sendImage(to: string, url: string, caption?: string): Promise<any> {
    return this.send({
      messaging_product: 'whatsapp', to, type: 'image',
      image: { link: url, caption }
    })
  }

  async sendButtons(to: string, opts: {
    body: string; header?: string; footer?: string;
    buttons: Array<{ id: string; text: string }>
  }): Promise<any> {
    return this.send({
      messaging_product: 'whatsapp', to,
      type: 'interactive',
      interactive: {
        type: 'button',
        ...(opts.header && { header: { type: 'text', text: opts.header } }),
        body: { text: opts.body },
        ...(opts.footer && { footer: { text: opts.footer } }),
        action: {
          buttons: opts.buttons.slice(0, 3).map(b => ({
            type: 'reply',
            reply: { id: b.id, title: b.text.slice(0, 20) }
          }))
        }
      }
    })
  }

  async sendList(to: string, opts: {
    body: string; header?: string; footer?: string; buttonText: string;
    sections: Array<{ title: string; rows: Array<{ id: string; title: string; description?: string }> }>
  }): Promise<any> {
    return this.send({
      messaging_product: 'whatsapp', to,
      type: 'interactive',
      interactive: {
        type: 'list',
        ...(opts.header && { header: { type: 'text', text: opts.header } }),
        body: { text: opts.body },
        ...(opts.footer && { footer: { text: opts.footer } }),
        action: { button: opts.buttonText, sections: opts.sections }
      }
    })
  }

  async sendCTA(to: string, opts: {
    body: string; header?: string; footer?: string;
    buttonText: string; url: string
  }): Promise<any> {
    return this.send({
      messaging_product: 'whatsapp', to,
      type: 'interactive',
      interactive: {
        type: 'cta_url',
        ...(opts.header && { header: { type: 'text', text: opts.header } }),
        body: { text: opts.body },
        ...(opts.footer && { footer: { text: opts.footer } }),
        action: { name: 'cta_url', parameters: { display_text: opts.buttonText, url: opts.url } }
      }
    })
  }

  async sendTemplate(to: string, opts: {
    name: string; language: string;
    components: Array<{ type: string; parameters: any[] }>
  }): Promise<any> {
    return this.send({
      messaging_product: 'whatsapp', to, type: 'template',
      template: { name: opts.name, language: { code: opts.language }, components: opts.components }
    })
  }

  async sendFlow(to: string, opts: {
    flowId: string; flowCta: string; screen: string; data?: object
  }): Promise<any> {
    return this.send({
      messaging_product: 'whatsapp', to,
      type: 'interactive',
      interactive: {
        type: 'flow',
        body: { text: opts.flowCta },
        action: {
          name: 'flow',
          parameters: {
            flow_message_version: '3',
            flow_token: `${Date.now()}`,
            flow_id: opts.flowId,
            flow_cta: opts.flowCta,
            flow_action: 'navigate',
            flow_action_payload: { screen: opts.screen, data: opts.data ?? {} }
          }
        }
      }
    })
  }

  async sendReaction(to: string, messageId: string, emoji: string): Promise<any> {
    return this.send({
      messaging_product: 'whatsapp', to, type: 'reaction',
      reaction: { message_id: messageId, emoji }
    })
  }
}