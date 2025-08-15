import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const genre = searchParams.get("genre")
    const sortBy = searchParams.get("sortBy") || "title"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (genre && genre !== "all") {
      where.genre = { has: genre }
    }

    const orderBy: any = {}
    switch (sortBy) {
      case "year":
        orderBy.year = "desc"
        break
      case "rating":
        orderBy.rating = "desc"
        break
      case "title":
      default:
        orderBy.title = "asc"
        break
    }

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.movie.count({ where }),
    ])

    return NextResponse.json({
      movies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching movies:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const movieData = await request.json()

    const movie = await prisma.movie.create({
      data: movieData,
    })

    return NextResponse.json(movie)
  } catch (error) {
    console.error("Error creating movie:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
