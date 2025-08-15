import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: params.id },
      include: {
        favorites: true,
        watchHistory: true,
      },
    })

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json(movie)
  } catch (error) {
    console.error("Error fetching movie:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
