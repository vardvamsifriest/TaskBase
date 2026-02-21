"use client"
import { ReactElement } from "react"
import { Button } from "./button"
import { useRouter } from "next/navigation"

interface CardProps {
    size: "lg" | "sm" | "md",
    description: string,
    icon?:ReactElement,
    button?:boolean
    showusername?:boolean
}

const sizeStyles = {
    "lg": "h-72 w-72 bg-slate-100  rounded-md shadow-xl",
    "md": "h-36 w-72 bg-slate-100  rounded-md shadow-lg",
    "sm": "h-24 w-24 bg-slate-100  rounded-md shadow-md"
}

export function Card(props: CardProps) {
    const router = useRouter();
    return (
        <div>
        <div className={`${sizeStyles[props.size]} p-4 `}>
            <div className="flex justify-center">
            <p className="font-snpro font-extrabold text-black">
                {props.description}
            </p>
            
           <div className="translate-x-20">
                {props.icon}
            </div>
            </div>
            {props.button && (
                <div className="flex justify-center">
                    <div>
                    <p className="text-2xl font-medium font-snpro">
                    Hi,
                </p>
                </div>
                {}
               <div className="flex justify-center pt-40">
                  <Button size="md" variant="primary" title="Log out" onClick={()=>router.push("/")} />
                    </div>
                    </ div>          
                    )}
                    </div>
        </div>
    )
}