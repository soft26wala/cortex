'use client'

import { useState, useEffect } from 'react';
import { BotAccount, KeywordRule, BotLog } from '@/types/whatsapp';

export function useWhatsAppBot() {
  const [account, setAccount] = useState<BotAccount | null>(null);
  const [keywords, setKeywords] = useState<KeywordRule[]>([]);
  const [logs, setLogs] = useState<BotLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBotData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/whatsapp/accounts');
      const data = await res.json();
      if (data.success && data.accounts.length > 0) {
        setAccount(data.accounts[0]);
      }

      const kwRes = await fetch('/api/whatsapp/keywords');
      const kwData = await kwRes.json();
      if (kwData.success) {
        setKeywords(kwData.keywords);
      }

      const logRes = await fetch('/api/whatsapp/analytics');
      const logData = await logRes.json();
      if (logData.success) {
        setLogs(logData.logs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBotData();
  }, []);

  const sendTestMessage = async (messageText: string) => {
    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botId: account?.id || 'bot-1',
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
