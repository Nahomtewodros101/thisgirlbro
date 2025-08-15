"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, MessageCircle } from "lucide-react"

interface Movie {
  id: string
  title: string
  poster: string
  rating: number
  year: number
  genre: string[]
}

interface MovieSuggestionCardProps {
  movie: Movie
  onSuggest: (movie: Movie) => void
}

export function MovieSuggestionCard({ movie, onSuggest }: MovieSuggestionCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardContent className="p-0">
        <div className="flex gap-3 p-3">
          <img
            src={movie.poster || "/placeholder.svg?height=120&width=80"}
            alt={movie.title}
            className="w-16 h-20 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-medium line-clamp-1 mb-1">{movie.title}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                {movie.rating}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {movie.year}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {movie.genre.slice(0, 2).map((g) => (
                <Badge key={g} variant="outline" className="text-xs">
                  {g}
                </Badge>
              ))}
            </div>
            <Button size="sm" variant="outline" onClick={() => onSuggest(movie)} className="w-full">
              <MessageCircle className="h-3 w-3 mr-1" />
              Suggest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
