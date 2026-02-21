"use client"
import { useState } from "react"
import { InputBox } from "./inputbox"
import { Button } from "./button"

interface inputcardprops {
  title: string
  onSubmit: (email: string, password: string, username: string) => void
  needusername:boolean
}

export function InputCard(props: inputcardprops) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  return (
    <div>
    <div className= {props.needusername ?"h-84 w-72 bg-slate-100 rounded-md gap-4 shadow-xl":
      "h-72 w-72 bg-slate-100 rounded-md gap-4 shadow-xl"}>
      <div className="pt-2">
        <p className="flex justify-center font-snpro font-bold text-2xl">
          {props.title}
        </p>
      </div>
      <div className="p-4">
        <InputBox 
          title="Enter your email" 
          placeholder="email"
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="p-4">
        <InputBox 
          title="Enter your password" 
          placeholder="password"
          value={password}
          onChange={setPassword}
        />
      </div>
      <div className="p-4">
        {props.needusername && (    <InputBox 
          title="Create a username for yourself" 
          placeholder="username"
          value={username}
          onChange={setUsername}
        />)}
      </div>
      <div className="flex justify-center">
        <Button 
          variant={"primary"} 
          title="Submit" 
          size={"sm"} 
          onClick={() => props.onSubmit(email, password, username)}
        />
      </div>
    </div>
    </div>
  )
}