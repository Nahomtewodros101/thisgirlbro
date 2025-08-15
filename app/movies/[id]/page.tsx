"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Play, Clock, Star, Calendar, ArrowLeft, MessageCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface Movie {
  id: string
  title: string
  description: string
  poster: string
  backdrop?: string
  genre: string[]
  year: number
  rating: number
  duration: number
}

export default function MovieDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${params.id}`)
        const movieData = await response.json()
        setMovie(movieData)
      } catch (error) {
        console.error("Error fetching movie:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchMovie()
    }
  }, [params.id])

  const handleFavoriteToggle = async () => {
    if (!session || !movie) return

    try {
      const response = await fetch("/api/movies/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: movie.id }),
      })
      const data = await response.json()
      setIsFavorite(data.isFavorite)
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Button asChild>
            <Link href="/movies">Back to Movies</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={movie.backdrop || movie.poster || "/placeholder.svg?height=400&width=800"}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="sm" asChild className="bg-black/50 hover:bg-black/70 text-white">
            <Link href="/movies">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Movies
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={movie.poster || "/placeholder.svg?height=600&width=400"}
                  alt={movie.title}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-heading mb-2">{movie.title}</CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {movie.rating}/10
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {movie.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {movie.duration} min
                      </span>
                    </div>
                  </div>
                  {session && (
                    <Button
                      variant={isFavorite ? "default" : "outline"}
                      onClick={handleFavoriteToggle}
                      className="shrink-0"
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                      {isFavorite ? "Favorited" : "Add to Favorites"}
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map((g) => (
                    <Badge key={g} variant="secondary">
                      {g}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">{movie.description}</p>

                <div className="flex gap-4">
                  <Button size="lg" className="flex-1">
                    <Play className="h-5 w-5 mr-2" />
                    Watch Now
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={`/chat?movie=${movie.id}`}>
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Discuss
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
