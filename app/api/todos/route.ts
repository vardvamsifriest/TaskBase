import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"  // Import authOptions

// GET - Fetch all todos
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)  // Pass authOptions
        console.log("Session:", session)  // Debug
        console.log("User ID:", session?.user?.id)  // Debug
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const todos = await prisma.todo.findMany({
            where: { userId: parseInt(session.user.id) },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(todos)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 })
    }
}

// POST - Create new todo
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)  // Pass authOptions
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { title, description, priority, category } = await req.json()

        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                priority,
                category,
                userId: parseInt(session.user.id)
            }
        })

        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 })
    }
}