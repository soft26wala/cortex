// lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API ?? 'http://localhost:4000/api'

class ApiError extends Error {
  constructor(public status: number, message: string) { super(message) }
}

async function request(method: string, path: string, body?: any) {
  const token = (() => {
    try { return JSON.parse(localStorage.getItem('session-store') ?? '{}')?.state?.token } catch { return null }
  })()

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new ApiError(res.status, err.error ?? 'Request failed')
  }
  return res.json()
}

export const api = {
  get:    (path: string)              => request('GET',    path),
  post:   (path: string, body: any)   => request('POST',   path, body),
  patch:  (path: string, body: any)   => request('PATCH',  path, body),
  put:    (path: string, body: any)   => request('PUT',    path, body),
  delete: (path: string)              => request('DELETE', path),
}