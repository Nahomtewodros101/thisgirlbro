"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { MovieCard } from "@/components/movies/movie-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft } from "lucide-react"
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

export default function FavoritesPage() {
  const { data: session } = useSession()
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/movies/favorites")
        if (response.ok) {
          const favoriteMovies = await response.json()
          setFavorites(favoriteMovies)
        }
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchFavorites()
    }
  }, [session])

  const handleFavoriteToggle = (movieId: string) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId))
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Please Sign In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">You need to be signed in to view your favorites.</p>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/movies">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Movies
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <h1 className="text-xl font-bold font-heading">My Favorite Movies</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-heading mb-2">No Favorites Yet</h2>
            <p className="text-muted-foreground mb-6">Start adding movies to your favorites to see them here!</p>
            <Button asChild>
              <Link href="/movies">Browse Movies</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-heading mb-2">Your Favorite Movies</h2>
              <p className="text-muted-foreground">
                You have {favorites.length} favorite movie{favorites.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} isFavorite={true} onFavoriteToggle={handleFavoriteToggle} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
