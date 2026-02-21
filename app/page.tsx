"use client"
import {Logo} from "./ui/logo"
import {Button} from "./ui/button"
import {Card} from "./ui/card"
import { PriorityCard } from "./ui/prioritycard"
import { TimeCard } from "./ui/timecard"
import {useRouter} from "next/navigation"


export default function Landing() {
    const router = useRouter();
    return (
        <div className="bg-slate-200 min-h-screen w-full">
            <div className="flex flex-col items-center pt-10 pb-20">
                <Logo showtagline={true}/>
                <div className="mt-20">
                    <Button size={"lg"} variant={"secondary"} title={"Get Started"}
                    onClick={()=>router.push("/signup")}/>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-8 pb-20">
                <div className="grid grid-cols-3 gap-8">
                    <Card 
                        size={"md"} 
                        showusername={false}
                        description={"Prioritize your tasks cleanly and become more efficient. TaskBase helps you stay focused on what matters most."}
                    />
                    <PriorityCard />
                    <TimeCard />
                </div>
            </div>
        </div>
    )
}