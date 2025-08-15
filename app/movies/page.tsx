"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movies/movie-card"
import { MovieFilters } from "@/components/movies/movie-filters"
import { Button } from "@/components/ui/button"
import { Loader2, Heart } from "lucide-react"
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

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchMovies = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        search,
        genre,
        sortBy,
        page: page.toString(),
      })

      const response = await fetch(`/api/movies?${params}`)
      const data = await response.json()

      setMovies(data.movies)
      setTotalPages(data.pagination.pages)
    } catch (error) {
      console.error("Error fetching movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/movies/favorites")
      if (response.ok) {
        const favoriteMovies = await response.json()
        setFavorites(favoriteMovies.map((m: Movie) => m.id))
      }
    } catch (error) {
      console.error("Error fetching favorites:", error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [search, genre, sortBy, page])

  useEffect(() => {
    fetchFavorites()
  }, [])

  const handleFavoriteToggle = (movieId: string) => {
    setFavorites((prev) => (prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]))
  }

  const clearFilters = () => {
    setSearch("")
    setGenre("all")
    setSortBy("title")
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <Link href="/" className="text-2xl font-bold font-heading text-primary">
              Debora & Nahom Movie Night
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/movies/favorites">
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading text-center mb-2">Movie Collection</h1>
          <p className="text-muted-foreground text-center">Discover your next favorite movie together</p>
        </div>

        <div className="mb-8">
          <MovieFilters
            search={search}
            genre={genre}
            sortBy={sortBy}
            onSearchChange={setSearch}
            onGenreChange={setGenre}
            onSortChange={setSortBy}
            onClearFilters={clearFilters}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.includes(movie.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>

            {movies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No movies found. Try adjusting your filters.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                  Previous
                </Button>
                <span className="flex items-center px-4 text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
