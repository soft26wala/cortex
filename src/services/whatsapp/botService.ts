import {
  matchAndProcessMessage,
  getKeywords,
  createKeyword,
  deleteKeyword,
  getBotLogs,
  getBotAccounts,
  getBotTemplates,
  getUserSubscription,
  activateUserSubscription,
  saveBotCredentials
} from '@/lib/whatsapp/db';

export class WhatsAppBotService {
  static async getAccounts(userId: string) {
    return await getBotAccounts(userId);
  }

  static async saveCredentials(userId: string, data: any) {
    return await saveBotCredentials(userId, data);
  }

  static async getKeywordRules(userId: string) {
    return await getKeywords(userId);
  }

  static async addKeywordRule(userId: string, data: { keyword: string; matchType: 'exact' | 'contains'; responseType: 'text' | 'button'; responseText: string }) {
    return await createKeyword(userId, {
      keyword: data.keyword,
      matchType: data.matchType,
      responseType: data.responseType,
      responseContent: { text: data.responseText }
    });
  }

  static async removeKeywordRule(userId: string, id: string) {
    return await deleteKeyword(userId, id);
  }

  static async processIncomingTextMessage(userId: string, botId: string, messageText: string, sender: string = '+91 98765 00000') {
    return await matchAndProcessMessage(userId, botId, messageText, sender);
  }

  static async getLogs(userId: string) {
    return await getBotLogs(userId);
  }

  static async getTemplates(userId: string) {
    return await getBotTemplates(userId);
  }

  static async getSubscription(userId: string) {
    return await getUserSubscription(userId);
  }

  static async activateSubscription(userId: string, planId: string, planName: string, paymentDetails?: any) {
    return await activateUserSubscription(userId, planId, planName, paymentDetails);
  }
}
