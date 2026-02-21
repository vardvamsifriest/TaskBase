"use client"
import { InputCard } from "../ui/inputcard"
import { Logo } from "../ui/logo"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function Signin() {
    const router = useRouter()  
    async function handleSignin(email: string, password: string) {
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            })

            if (result?.ok) {
                router.push("/home")
            } else {
                console.log("Invalid credentials")
            }
        } catch (err: any) {
            console.log("Signin error:", err)
        }
    }

    return (
        <div className="h-screen w-full bg-slate-200">
            <div className="h-24 w-full flex justify-center bg-slate-100">
                <div className="scale-75">
                    <Logo />
                </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 mt-50">
                <InputCard title="Signin" onSubmit={handleSignin} needusername={false}/>
            </div>
        </div>          
    )
}