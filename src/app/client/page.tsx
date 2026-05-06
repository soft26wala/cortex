"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ClientModal from "@/components/ClientModal"

export default function Clients() {
  const [clients, setClients] = useState([])
  const router = useRouter()
  // const [open, setOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}clients/1`)
      .then(res => res.json())
      .then(setClients)
  }, [])

    const handleEdit = (client:any) => {
    setSelectedClient(client)
    setOpenModal(true)
  }


  return (
    <div className="p-6 mt-32">
      <h1>Clients</h1>

        <button
        onClick={() => setOpenModal(true)}
        className="bg-blue-600 text-white px-5 py-3 rounded-xl"
      >
        Add Client
      </button>

 <ClientModal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
          setSelectedClient(null)
        }}
        editData={selectedClient}
      />

      {/* 🔥 CLIENT LIST */}
      {clients.map((c:any) => (
        <div
          key={c.id}
          className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 flex items-center justify-between hover:border-blue-500 transition"
        >

          {/* LEFT */}
          <div
            onClick={() => router.push(`/builder/${c.slug}`)}
            className="cursor-pointer flex-1"
          >
            <h2 className="text-white font-bold text-lg">
              {c.name}
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              {c.phone}
            </p>

            <div className="flex gap-2 mt-2 flex-wrap">

              <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded">
                {c.plan_name || "Basic"}
              </span>

              <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded">
                {c.used_messages || 0}/{c.total_messages || 0}
              </span>

            </div>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex gap-2 ml-4">

            {/* EDIT */}
            <button
              onClick={() => handleEdit(c)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold"
            >
              Edit
            </button>

            {/* OPEN BUILDER */}
            <button
              onClick={() => router.push(`/builder/${c.slug}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Open
            </button>

          </div>
        </div>
      ))}
    </div>
  )
}