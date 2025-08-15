import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { movieId } = await request.json()

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId,
        },
      },
    })

    if (existingFavorite) {
      // Remove from favorites
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      })
      return NextResponse.json({ isFavorite: false })
    } else {
      // Add to favorites
      await prisma.favorite.create({
        data: {
          userId: session.user.id,
          movieId,
        },
      })
      return NextResponse.json({ isFavorite: true })
    }
  } catch (error) {
    console.error("Error toggling favorite:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: { movie: true },
    })

    return NextResponse.json(favorites.map((f) => f.movie))
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
