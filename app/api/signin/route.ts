import { NextRequest } from "next/server";
import {prisma} from "../../../lib/prisma"

export async function POST (req:NextRequest){
    const res = await prisma.user.find{}
}