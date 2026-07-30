export interface BotAccount {
  id: string;
  userId: string;
  phoneNumber: string;
  name: string;
  status: 'connected' | 'connecting' | 'disconnected';
  qrCode?: string;
  waBusinessId?: string;
  phoneNumberId?: string;
  accessToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BotMessage {
  id: string;
  botId: string;
  direction: 'inbound' | 'outbound';
  sender: string;
  recipient: string;
  messageType: 'text' | 'button' | 'list' | 'template' | 'media';
  content: any;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
}

export interface KeywordRule {
  id: string;
  botId: string;
  keyword: string;
  matchType: 'exact' | 'contains' | 'startsWith' | 'regex';
  responseType: 'text' | 'button' | 'list' | 'template';
  responseContent: any;
  isActive: boolean;
  triggerCount: number;
  createdAt: string;
}

export interface MessageTemplate {
  id: string;
  botId: string;
  name: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  componentsJson: any;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt: string;
}

export interface BotLog {
  id: string;
  botId: string;
  eventType: 'keyword_matched' | 'auto_reply_sent' | 'webhook_received' | 'error';
  details: string;
  timestamp: string;
}

export interface BotSettings {
  id: string;
  botId: string;
  autoReplyEnabled: boolean;
  workingHoursOnly: boolean;
  workingHoursStart?: string;
  workingHoursEnd?: string;
  fallbackMessage: string;
  welcomeMessage: string;
}
