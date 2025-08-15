"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Calendar } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  createdAt: string
  sender: {
    id: string
    name: string
    avatar?: string
  }
  movie?: {
    id: string
    title: string
    poster: string
    rating: number
    year: number
  }
}

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"} mb-4`}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
        <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-xs md:max-w-md`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground">{message.sender.name}</span>
          <span className="text-xs text-muted-foreground">{formatTime(message.createdAt)}</span>
        </div>

        <div
          className={`rounded-lg px-4 py-2 ${
            isOwn ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-muted-foreground rounded-bl-sm"
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>

        {message.movie && (
          <Card className="mt-2 max-w-xs overflow-hidden">
            <CardContent className="p-0">
              <Link href={`/movies/${message.movie.id}`} className="block hover:opacity-80 transition-opacity">
                <div className="flex gap-3 p-3">
                  <img
                    src={message.movie.poster || "/placeholder.svg?height=80&width=60"}
                    alt={message.movie.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">{message.movie.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {message.movie.rating}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {message.movie.year}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
