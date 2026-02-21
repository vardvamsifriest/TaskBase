import { signIn } from "next-auth/react";

export function GitHubButton()
{
    return (
        <div className="flex items-center">
        <button onClick={()=>signIn("github",{callbackUrl:"/home"})} 
        className="bg-emerald-500 ransition duration-300 delay-50 ease-in-out hover:scale-110 rounded-md font-semibold font-snpro flex gap-4 p-2"> 
            <div><img src= "/icons/github.png"
        className="h-5 w-5"/></div>Continue with GitHub</button>
    </div>
    )
}