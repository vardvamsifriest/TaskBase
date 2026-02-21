import {signIn} from "next-auth/react"
export function GoogleButton()
{      
    return (
    <div className="flex items-center">
        <button onClick={()=>signIn('google',{callbackUrl:"/home"})} 
        className="bg-blue-200 ransition duration-300 delay-50 ease-in-out hover:scale-110 rounded-md font-semibold font-snpro flex gap-4 p-2"> 
            <div><img src= "/icons/google.png"
        className="h-5 w-5"/></div>Continue with Google</button>
    </div>
    )
}