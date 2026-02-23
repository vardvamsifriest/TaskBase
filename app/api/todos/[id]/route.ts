import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) 
{
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const params = await context.params
        const body = await req.json()
        const todoId = parseInt(params.id)

        const existing = await prisma.todo.findUnique({
            where: { id: todoId }
        })

        if (existing?.userId !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const updated = await prisma.todo.update({
            where: { id: todoId },
            data: body
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error("PATCH Error:", error)
        return NextResponse.json({ error: "Failed to update todo" }, { status: 500 })
    }
}


export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const params = await context.params
        const todoId = parseInt(params.id)

        const existing = await prisma.todo.findUnique({
            where: { id: todoId }
        })

        if (existing?.userId !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        await prisma.todo.delete({
            where: { id: todoId }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("DELETE Error:", error)
        return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 })
    }
}