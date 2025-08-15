"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Film } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (content: string) => void
  onToggleMovieSuggestions: () => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, onToggleMovieSuggestions, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-card/50">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onToggleMovieSuggestions}
        className="shrink-0 bg-transparent"
      >
        <Film className="h-4 w-4" />
      </Button>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={!message.trim() || disabled}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
