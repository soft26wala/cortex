'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, HelpCircle, ExternalLink, Key, Phone, ShieldCheck, CheckCircle2, Copy } from 'lucide-react'

export interface FieldHelpInfo {
  title: string
  fieldKey: string
  description: string
  metaLocation: string
  exampleValue: string
  steps: string[]
  docUrl: string
}

export const META_HELP_DATA: Record<string, FieldHelpInfo> = {
  appId: {
    title: 'Meta App ID',
    fieldKey: 'metaAppId',
    description: 'The unique numeric identifier of your Meta Developer App created in Facebook for Developers.',
    metaLocation: 'Meta Developers Portal -> App Dashboard -> App ID (Top Header)',
    exampleValue: '835851607854920',
    steps: [
      'Go to developers.facebook.com and log in.',
      'Click on "My Apps" in the top navigation bar.',
      'Select your WhatsApp App (or click "Create App" -> "Business").',
      'Copy the 15-digit App ID displayed under your App Name at the top.'
    ],
    docUrl: 'https://developers.facebook.com/docs/development/create-an-app'
  },
  appSecret: {
    title: 'Meta App Secret',
    fieldKey: 'metaAppSecret',
    description: 'The security secret key used to sign webhooks and verify requests from Meta Cloud API.',
    metaLocation: 'Meta Developers Portal -> App Settings -> Basic -> App Secret',
    exampleValue: '9e3fb32e774f7b909c88ca640d01216e',
    steps: [
      'Open your App in developers.facebook.com.',
      'Navigate to App Settings -> Basic in the left sidebar.',
      'Click "Show" next to App Secret and enter your Facebook password.',
      'Copy the 32-character secret string.'
    ],
    docUrl: 'https://developers.facebook.com/docs/development/create-an-app'
  },
  phoneNumberId: {
    title: 'Phone Number ID',
    fieldKey: 'phoneNumberId',
    description: 'The specific Meta Phone Number ID associated with your WhatsApp Business test or production number.',
    metaLocation: 'Meta Developers Portal -> WhatsApp -> API Setup -> Phone Number ID',
    exampleValue: '108920193821039',
    steps: [
      'In App Dashboard, click "WhatsApp" -> "API Setup" in the left menu.',
      'Under Step 1: Select Phone Numbers, locate "Phone number ID".',
      'Copy the 15-digit Phone Number ID (this is DIFFERENT from your phone number).'
    ],
    docUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api/get-started'
  },
  wabaId: {
    title: 'WhatsApp Business Account ID (WABA ID)',
    fieldKey: 'wabaId',
    description: 'The overall WhatsApp Business Account container ID holding your phone numbers and templates.',
    metaLocation: 'Meta Developers Portal -> WhatsApp -> API Setup -> WhatsApp Business Account ID',
    exampleValue: '109821039821038',
    steps: [
      'Go to WhatsApp -> API Setup in your Meta App.',
      'Locate "WhatsApp Business Account ID" displayed above Phone Number ID.',
      'Copy the 15-digit WABA ID.'
    ],
    docUrl: 'https://developers.facebook.com/docs/whatsapp/business-management-api'
  },
  accessToken: {
    title: 'Meta System User Access Token',
    fieldKey: 'accessToken',
    description: 'A permanent system user access token with whatsapp_business_messaging permissions to send messages 24/7 without expiring.',
    metaLocation: 'Meta Business Manager -> Users -> System Users -> Generate Token',
    exampleValue: 'EAAG835851607854... (Long String starting with EAAG)',
    steps: [
      'Open business.facebook.com -> Business Settings.',
      'Go to Users -> System Users -> Add System User (Role: Admin).',
      'Click "Generate New Token" -> Select your WhatsApp App.',
      'Check permissions: whatsapp_business_messaging & whatsapp_business_management.',
      'Copy the permanent token (Save it securely!).'
    ],
    docUrl: 'https://developers.facebook.com/docs/whatsapp/business-management-api/get-started'
  },
  verifyToken: {
    title: 'Webhook Verify Token',
    fieldKey: 'verifyToken',
    description: 'A custom secret verification token string you define to authorize Meta Webhook verification requests.',
    metaLocation: 'Meta Developers Portal -> WhatsApp -> Configuration -> Webhook Edit',
    exampleValue: 'cortex_whatsapp_verify_secret_2026',
    steps: [
      'Enter any secret string of your choice in this field.',
      'In Meta Developers -> WhatsApp -> Configuration, paste your Webhook URL.',
      'Paste the EXACT same Verify Token string when Meta asks for verification token.',
      'Click "Verify and Save".'
    ],
    docUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks'
  }
}

interface MetaHelpModalProps {
  fieldKey: string | null
  onClose: () => void
}

export function MetaHelpModal({ fieldKey, onClose }: MetaHelpModalProps) {
  if (!fieldKey || !META_HELP_DATA[fieldKey]) return null
  const info = META_HELP_DATA[fieldKey]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Meta Cloud API Guide</span>
              <h2 className="text-2xl font-black text-white">{info.title}</h2>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            {info.description}
          </p>

          <div className="mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Location in Meta Portal</span>
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
              📍 {info.metaLocation}
            </div>
          </div>

          <div className="mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Step-by-Step Instructions</span>
            <div className="space-y-2 text-xs">
              {info.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Example Value</span>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 flex items-center justify-between">
              <span className="truncate mr-2">{info.exampleValue}</span>
              <span className="text-[10px] text-slate-500 font-sans">Sample</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <a
              href={info.docUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:underline"
            >
              Official Meta Documentation <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
