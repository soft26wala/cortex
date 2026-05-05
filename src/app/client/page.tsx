"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Clients() {
  const [clients, setClients] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/clients/1`)
      .then(res => res.json())
      .then(setClients)
  }, [])

  return (
    <div className="p-6 mt-32">
      <h1>Clients</h1>

      <button onClick={() => router.push("/client/create")}>
        + Add Client
      </button>

      {clients.map((c:any) => (
        <div key={c.id}
          onClick={() => router.push(`/builder/${c.slug}`)}
          className="p-3 border mt-2 cursor-pointer">
          {c.name}
        </div>
      ))}
    </div>
  )
}