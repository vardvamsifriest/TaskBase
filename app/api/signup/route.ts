import { NextRequest , NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma"
import bcrypt from "bcrypt"
export async function POST (req:NextRequest)
{
    const {username,email,password} = await req.json();
    const unique = await prisma.user.findFirst({where:
        {OR:[{email:email},{ username:username}]}
})
    
        if(unique)
        {
            return NextResponse.json({
                error:"User already exists"},{
                    status:400})
        }
            
    const hashedPass = await 
    bcrypt.hash(password,10)
    const user = await prisma.user.create({
        data :{
            username,
            email,
            password:hashedPass
        }
    })

    return NextResponse.json(user); 
}