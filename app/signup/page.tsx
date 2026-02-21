"use client"
import {Logo} from "../ui/logo"
import { GoogleButton } from "../ui/googlebutton"
import { GitHubButton } from "../ui/githubbutton"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
export default function IntroPage()
{   const router = useRouter();
    return (
        <div className="h-screen w-full bg-slate-200 ">
            <div className="h-24 w-full flex justify-center bg-slate-100">
                <div className="scale-75">
                    <Logo />
                </div>
            </div>
           
            <div className="relative mt-40 w-full h-96">
  
  <div className="absolute left-1/2 -translate-x-1/2">
    <div className="h-80 w-72 bg-slate-100 rounded-md shadow-xl">
      <p className="font-snpro font-bold p-4">
        Choose a way to Signup for TaskBase
      </p>
      <div className="mt-2 ml-8">
        <Button
          size="sm"
          variant="primary"
          title="Sign up with Email"
          imgSrc="/icons/checkbox.png"
          onClick={() => router.push("/credentialsignup")}
        />
        <div className="pt-4 pb-4">
          <GoogleButton />
        </div>
        <GitHubButton />
      </div>
      <div className="flex justify-center pt-10">
      <Link href={ "/signin"}>Already have an account?</Link>
      </div>
    </div>
  </div>


        <div className="absolute right-28 top-6">
         <img src="/icons/working.png" className="h-60 w-60 float" />
         </div>
        </div>

        </div>
    )
}