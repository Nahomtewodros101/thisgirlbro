import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const movieId = searchParams.get("movieId")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const where: any = {
      OR: [{ senderId: session.user.id }, { receiverId: session.user.id }],
    }

    if (movieId) {
      where.movieId = movieId
    }

    const messages = await prisma.message.findMany({
      where,
      include: {
        sender: {
          select: { id: true, name: true, avatar: true },
        },
        receiver: {
          select: { id: true, name: true, avatar: true },
        },
        movie: {
          select: { id: true, title: true, poster: true, rating: true, year: true },
        },
      },
      orderBy: { createdAt: "asc" },
      take: limit,
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, receiverId, movieId } = await request.json()

    if (!content || !receiverId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.user.id,
        receiverId,
        movieId: movieId || null,
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true },
        },
        receiver: {
          select: { id: true, name: true, avatar: true },
        },
        movie: {
          select: { id: true, title: true, poster: true, rating: true, year: true },
        },
      },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
