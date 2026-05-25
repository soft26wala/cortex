// app/(auth)/register/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (form.password.length < 8) return setError('Password must be at least 8 characters')
    setError(''); setLoading(true)
    try {
      await api.post('/auth/register', { name: form.name, email: form.email, password: form.password })
      router.replace('/login?registered=1')
    } catch (err: any) {
      setError(err.message ?? 'Registration failed')
    } finally { setLoading(false) }
  }

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
      <input
        type={type} required value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-zinc-400 text-sm mt-1">Start building WhatsApp flows</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
          {error && (
            <div className="mb-4 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {field('name',     'Full Name',        'text',     'Your name')}
            {field('email',    'Email',            'email',    'you@example.com')}
            {field('password', 'Password',         'password', '8+ characters')}
            {field('confirm',  'Confirm Password', 'password', 'Repeat password')}
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
          <p className="text-center text-xs text-zinc-500 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}