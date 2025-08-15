"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

interface MovieFiltersProps {
  search: string
  genre: string
  sortBy: string
  onSearchChange: (search: string) => void
  onGenreChange: (genre: string) => void
  onSortChange: (sort: string) => void
  onClearFilters: () => void
}

const genres = [
  "All Genres",
  "Romance",
  "Comedy",
  "Drama",
  "Action",
  "Adventure",
  "Sci-Fi",
  "Thriller",
  "Horror",
  "Musical",
  "Animation",
  "Documentary",
]

export function MovieFilters({
  search,
  genre,
  sortBy,
  onSearchChange,
  onGenreChange,
  onSortChange,
  onClearFilters,
}: MovieFiltersProps) {
  return (
    <div className="bg-card/50 p-6 rounded-lg border">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg">Find Your Perfect Movie</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search movies..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={genre} onValueChange={onGenreChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((g) => (
              <SelectItem key={g} value={g === "All Genres" ? "all" : g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title A-Z</SelectItem>
            <SelectItem value="year">Newest First</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onClearFilters} className="w-full bg-transparent">
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
