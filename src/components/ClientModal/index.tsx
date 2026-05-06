"use client"

import { useState } from "react"

export default function ClientModal({
  open,
  onClose,
  editData
}: any) {

  const [form, setForm] = useState({
    name: editData?.name || "",
    phone: editData?.phone || "",
    phone_number_id: editData?.phone_number_id || "",
    access_token: editData?.access_token || "",
    waba_id: editData?.waba_id || "",
    plan_name: editData?.plan_name || "Basic",
    total_messages: editData?.total_messages || 1000,
    expires_at: editData?.expires_at || ""
  })

  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const save = async () => {

    const url = editData
      ? `${process.env.NEXT_PUBLIC_API}clients/${editData.id}`
      : `${process.env.NEXT_PUBLIC_API}clients`

    const method = editData ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        userId: 1
      })
    })

    const data = await res.json()

    window.location.href = `/builder/${data.slug}`
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-zinc-900 w-full max-w-2xl rounded-2xl p-6 border border-zinc-700">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {editData ? "Update Client" : "Create Client"}
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="name"
            placeholder="Client Name"
            value={form.name}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded text-white"
          />

          <input
            name="phone"
            placeholder="WhatsApp Number"
            value={form.phone}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded text-white"
          />

          <input
            name="phone_number_id"
            placeholder="Phone Number ID"
            value={form.phone_number_id}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded text-white"
          />

          <input
            name="waba_id"
            placeholder="WABA ID"
            value={form.waba_id}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded text-white"
          />

          <input
            name="plan_name"
            placeholder="Plan Name"
            value={form.plan_name}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded text-white"
          />

          <input
            type="number"
            name="total_messages"
            placeholder="Total Messages"
            value={form.total_messages}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded text-white"
          />

          <input
            type="date"
            name="expires_at"
            value={form.expires_at}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded text-white"
          />

        </div>

        <textarea
          name="access_token"
          placeholder="Access Token"
          value={form.access_token}
          onChange={handleChange}
          className="bg-zinc-800 p-3 rounded text-white w-full mt-4 h-32"
        />

        <button
          onClick={save}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-6 py-3 rounded-xl font-bold"
        >
          {editData ? "Update Client" : "Create Client"}
        </button>

      </div>
    </div>
  )
}