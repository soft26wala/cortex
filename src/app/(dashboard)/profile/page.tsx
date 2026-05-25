// app/(dashboard)/profile/page.tsx
'use client'
import { useState } from 'react'
import { User, Lock, CreditCard, LogOut, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { api } from '@/lib/api'
import { useSessionStore } from '@/store/session.store'

export default function ProfilePage() {
  const { user, logout } = useSessionStore()
  const [tab, setTab] = useState<'general' | 'password' | 'billing'>('general')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [profile, setProfile] = useState({ name: user?.name ?? '', email: user?.email ?? '' })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.patch('/auth/profile', profile)
      setMessage({ type: 'success', text: 'Profile updated successfully' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message ?? 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwords.next !== passwords.confirm) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }
    setSaving(true)
    try {
      await api.post('/auth/change-password', {
        current: passwords.current,
        next: passwords.next,
      })
      setPasswords({ current: '', next: '', confirm: '' })
      setMessage({ type: 'success', text: 'Password changed successfully' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message ?? 'Failed to change password' })
    } finally {
      setSaving(false)
    }
  }

  const TABS = [
    { key: 'general', label: 'General', icon: User },
    { key: 'password', label: 'Security', icon: Lock },
    { key: 'billing', label: 'Billing', icon: CreditCard },
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Account Settings</h1>
        <p className="text-zinc-500 mt-1">Manage your profile and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl w-fit">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key as any)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === key
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>

      {/* Messages */}
      {message && (
        <div className={`flex items-center gap-3 p-3 rounded-xl border ${
          message.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          )}
          <span className={`text-xs ${
            message.type === 'success'
              ? 'text-emerald-700 dark:text-emerald-400'
              : 'text-red-700 dark:text-red-400'
          }`}>{message.text}</span>
        </div>
      )}

      {/* General Tab */}
      {tab === 'general' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed"
              />
              <p className="text-[10px] text-zinc-400 mt-1">Email cannot be changed</p>
            </div>
            <button type="submit" disabled={saving}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
              {saving && <Loader2 size={13} className="animate-spin" />}
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </div>
      )}

      {/* Password Tab */}
      {tab === 'password' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">New Password</label>
              <input
                type="password"
                value={passwords.next}
                onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <button type="submit" disabled={saving}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
              {saving && <Loader2 size={13} className="animate-spin" />}
              {saving ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </div>
      )}

      {/* Billing Tab */}
      {tab === 'billing' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Current Plan</h3>
            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div>
                <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Pro Plan</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">$99/month</p>
              </div>
              <button className="px-3 py-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 border border-emerald-200 rounded-lg">
                Change plan
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Billing Address</h3>
            <button className="w-full text-left p-3 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-sm text-zinc-500 hover:text-zinc-700 transition-colors">
              + Add billing address
            </button>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Payment Method</h3>
            <button className="w-full text-left p-3 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-sm text-zinc-500 hover:text-zinc-700 transition-colors">
              + Add payment method
            </button>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
        <button onClick={logout}
          className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-medium transition-colors">
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  )
}