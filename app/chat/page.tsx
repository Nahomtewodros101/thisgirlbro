"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { MessageBubble } from "@/components/chat/message-bubble";
import { MovieSuggestionCard } from "@/components/chat/movie-suggestion-card";
import { ChatInput } from "@/components/chat/chat-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, ArrowLeft, X } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  movie?: {
    id: string;
    title: string;
    poster: string;
    rating: number;
    year: number;
  };
}

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  genre: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function ChatPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showMovieSuggestions, setShowMovieSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const userData = await response.json();
        setUsers(userData);
        if (userData.length > 0 && !selectedUser) {
          setSelectedUser(userData[0]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (session) {
      fetchUsers();
    }
  }, [session]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      try {
        const response = await fetch("/api/messages");
        const messageData = await response.json();
        setMessages(messageData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (selectedUser) {
      fetchMessages();
      // Poll for new messages every 3 seconds
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies?limit=20");
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (showMovieSuggestions) {
      fetchMovies();
    }
  }, [showMovieSuggestions]);

  const sendMessage = async (content: string, movieId?: string) => {
    if (!selectedUser || !session) return;

    setLoading(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          receiverId: selectedUser.id,
          movieId,
        }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages((prev) => [...prev, newMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSuggestion = (movie: Movie) => {
    sendMessage(
      `I think we should watch "${movie.title}"! What do you think?`,
      movie.id
    );
    setShowMovieSuggestions(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Please Sign In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              You need to be signed in to access the chat.
            </p>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold font-heading">
                Chat with {selectedUser?.name || "Partner"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-4xl mx-auto">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Start Your Conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Send a message or suggest a movie to get the conversation
                    started!
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.sender.id === session.user?.id}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={(content) => sendMessage(content)}
            onToggleMovieSuggestions={() =>
              setShowMovieSuggestions(!showMovieSuggestions)
            }
            disabled={loading}
          />
        </div>

        {/* Movie Suggestions Sidebar */}
        {showMovieSuggestions && (
          <div className="w-80 border-l border-border bg-card/30">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-medium">Suggest a Movie</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMovieSuggestions(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-4 space-y-3">
                {movies.map((movie) => (
                  <MovieSuggestionCard
                    key={movie.id}
                    movie={movie}
                    onSuggest={handleMovieSuggestion}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
