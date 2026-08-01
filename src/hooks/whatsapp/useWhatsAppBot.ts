'use client'

import { useState, useEffect } from 'react';
import { BotAccount, KeywordRule, BotLog } from '@/types/whatsapp';

export function useWhatsAppBot(userId?: string) {
  const [account, setAccount] = useState<BotAccount | null>(null);
  const [keywords, setKeywords] = useState<KeywordRule[]>([]);
  const [logs, setLogs] = useState<BotLog[]>([]);
  const [loading, setLoading] = useState(true);

  const getHeaders = () => {
    const headers: Record<string, string> = {};
    if (userId) headers['x-user-id'] = userId;
    return headers;
  };

  const fetchBotData = async () => {
    try {
      setLoading(true);
      const headers = getHeaders();

      const res = await fetch('/api/whatsapp/accounts', { headers });
      const data = await res.json();
      if (data.success && data.accounts.length > 0) {
        setAccount(data.accounts[0]);
      } else {
        setAccount(null);
      }

      const kwRes = await fetch('/api/whatsapp/keywords', { headers });
      const kwData = await kwRes.json();
      if (kwData.success) {
        setKeywords(kwData.keywords);
      } else {
        setKeywords([]);
      }

      const logRes = await fetch('/api/whatsapp/analytics', { headers });
      const logData = await logRes.json();
      if (logData.success) {
        setLogs(logData.logs);
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBotData();
  }, [userId]);

  const sendTestMessage = async (messageText: string) => {
    try {
      const headers = { ...getHeaders(), 'Content-Type': 'application/json' };
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          botId: account?.id || `bot-${userId || 'user-1'}`,
          text: messageText,
          sender: '+91 99999 88888'
        })
      });
      const data = await res.json();
      fetchBotData();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return {
    account,
    keywords,
    logs,
    loading,
    refreshData: fetchBotData,
    sendTestMessage
  };
}
