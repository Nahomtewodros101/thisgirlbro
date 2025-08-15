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

    const [favoritesCount, watchHistoryCount, messagesCount, recentActivity] = await Promise.all([
      prisma.favorite.count({
        where: { userId: session.user.id },
      }),
      prisma.watchHistory.count({
        where: { userId: session.user.id },
      }),
      prisma.message.count({
        where: { senderId: session.user.id },
      }),
      prisma.watchHistory.findMany({
        where: { userId: session.user.id },
        include: { movie: true },
        orderBy: { watchedAt: "desc" },
        take: 5,
      }),
    ])

    return NextResponse.json({
      favoritesCount,
      watchHistoryCount,
      messagesCount,
      recentActivity,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
