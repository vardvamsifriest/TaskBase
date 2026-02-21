"use client";

import axios from "axios";
import { Logo } from "../ui/logo";
import { InputCard } from "../ui/inputcard";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  async function handleSignup(email: string, password: string, username: string) {
    try {
      const response = await axios.post("/api/signup", {
        email,
        password,
        username,
      });

      if (response.status === 200 || response.status === 201) {
        router.push("/signin");
      }
    } catch (err: any) {
      console.log("Signup error:", err?.response?.data || err.message);
    }
  }

  return (
    <div className="bg-slate-200 min-h-screen w-full">
      
      <div className="bg-slate-100 h-24 w-full flex items-center justify-center">
        <div className="scale-75">
          <Logo showtagline={false} />
        </div>
      </div>

     
      <div className="relative mt-40 w-full h-[400px]">
        
        <div className="absolute left-1/2 -translate-x-1/2">
          <InputCard title="SignUp" onSubmit={handleSignup} needusername />
        </div>

       
        <div className="absolute left-40 top-10">
          <img className="h-60 w-60 float" src="/icons/tasks.png" />
        </div>
      </div>
    </div>
  );
}
