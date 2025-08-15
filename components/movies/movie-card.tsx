"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Play, Clock, Star } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface Movie {
  id: string
  title: string
  description: string
  poster: string
  genre: string[]
  year: number
  rating: number
  duration: number
}

interface MovieCardProps {
  movie: Movie
  isFavorite?: boolean
  onFavoriteToggle?: (movieId: string) => void
}

export function MovieCard({ movie, isFavorite = false, onFavoriteToggle }: MovieCardProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleFavoriteToggle = async () => {
    if (!session || !onFavoriteToggle) return

    setIsLoading(true)
    try {
      await fetch("/api/movies/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: movie.id }),
      })
      onFavoriteToggle(movie.id)
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={movie.poster || "/placeholder.svg?height=400&width=300"}
            alt={movie.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <Link href={`/movies/${movie.id}`}>
              <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
          {session && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              onClick={handleFavoriteToggle}
              disabled={isLoading}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-lg line-clamp-1">{movie.title}</CardTitle>
          <CardDescription className="line-clamp-2">{movie.description}</CardDescription>
        </CardHeader>
        <div className="px-6 pb-4 space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {movie.rating}
            </span>
            <span>{movie.year}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {movie.duration}m
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map((g) => (
              <Badge key={g} variant="secondary" className="text-xs">
                {g}
              </Badge>
            ))}
            {movie.genre.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{movie.genre.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
