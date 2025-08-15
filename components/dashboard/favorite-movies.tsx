import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import Link from "next/link"

interface Movie {
  id: string
  title: string
  poster: string
  rating: number
  year: number
  genre: string[]
}

interface FavoriteMoviesProps {
  movies: Movie[]
}

export function FavoriteMovies({ movies }: FavoriteMoviesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Favorite Movies
        </CardTitle>
      </CardHeader>
      <CardContent>
        {movies.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No favorite movies yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.slice(0, 8).map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
                <div className="space-y-2">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={movie.poster || "/placeholder.svg?height=120&width=80"}
                      alt={movie.title}
                      className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-xs line-clamp-1">{movie.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-2 w-2 mr-1" />
                        {movie.rating}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
