'use client';

import Input from "@/components/Input";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (response.status === 200) {
      window.location.href = '/'
    } else {
      const data = await response.json()
      toast.error(data.message)
    }
  }

  return (
    <div className="w-full flex flex-col ">
      <div className="mx-12 mt-12 max-w-3xl w-full self-center">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-8">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <Input id="email" label="email" placeholder="example@domain.com" onChange={e => setEmail(e.target.value)} />
          <Input id="password" type="password" label="password" placeholder="******" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
