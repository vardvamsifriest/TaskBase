import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route" 

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Find user by email to get database ID
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const todos = await prisma.todo.findMany({
            where: { userId: user.id },  // Use database ID
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(todos)
    } catch (error) {
        console.error("GET /api/todos error:", error)
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Find user by email to get database ID
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const { title, description, priority, category } = await req.json()

        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                priority,
                category,
                userId: user.id  // Use database ID
            }
        })

        return NextResponse.json(todo)
    } catch (error) {
        console.error("POST /api/todos error:", error)
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 })
    }
}