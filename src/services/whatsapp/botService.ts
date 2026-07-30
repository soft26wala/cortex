import { matchAndProcessMessage, getKeywords, createKeyword, deleteKeyword, getBotLogs, getBotAccounts, getBotTemplates } from '@/lib/whatsapp/db';

export class WhatsAppBotService {
  static async getAccounts() {
    return await getBotAccounts();
  }

  static async getKeywordRules() {
    return await getKeywords();
  }

  static async addKeywordRule(data: { keyword: string; matchType: 'exact' | 'contains'; responseType: 'text' | 'button'; responseText: string }) {
    return await createKeyword({
      keyword: data.keyword,
      matchType: data.matchType,
      responseType: data.responseType,
      responseContent: { text: data.responseText }
    });
  }

  static async removeKeywordRule(id: string) {
    return await deleteKeyword(id);
  }

  static async processIncomingTextMessage(botId: string, messageText: string, sender: string = '+91 98765 00000') {
    return await matchAndProcessMessage(botId, messageText, sender);
  }

  static async getLogs() {
    return await getBotLogs();
  }

  static async getTemplates() {
    return await getBotTemplates();
  }
}
