"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateClient() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const router = useRouter()

  const save = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/clients`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        name,
        phone,
        userId: 1
      }) 
    })

    const data = await res.json()
    router.push(`/builder/${data.slug}`)
  }

  return (
    <div className="p-6 mt-32">
      <input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <input placeholder="Phone" onChange={e=>setPhone(e.target.value)} />

      <button onClick={save}>Create</button>
    </div>
  )
}