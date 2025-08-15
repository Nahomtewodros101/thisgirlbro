"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Play, MessageCircle, User, LogOut, Sparkles, Star, Coffee } from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-primary animate-pulse" fill="currentColor" />
              <Sparkles className="h-4 w-4 text-primary/60 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Debora & Nahom's Movie Haven
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm text-muted-foreground">Welcome, {session.user?.name}!</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/chat">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/movies">
                    <Play className="h-4 w-4 mr-2" />
                    Movies
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5"></div>
        <div className="absolute top-10 left-10 text-primary/20 animate-bounce">
          <Heart className="h-6 w-6" fill="currentColor" />
        </div>
        <div className="absolute top-20 right-20 text-primary/20 animate-pulse">
          <Star className="h-8 w-8" fill="currentColor" />
        </div>
        <div className="absolute bottom-20 left-20 text-primary/20 animate-bounce delay-1000">
          <Sparkles className="h-5 w-5" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="mb-6">
            <h2 className="text-6xl md:text-7xl font-bold font-heading bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-4">
              Your Love Story
            </h2>
            <h3 className="text-4xl md:text-5xl font-heading text-primary/80 mb-6">One Movie at a Time ✨</h3>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            "Every great love story deserves the perfect soundtrack of films"
          </p>
          <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto italic">
            Discover romantic classics, share your thoughts, and create magical movie nights together 💕
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {session ? (
              <>
                <Button
                  size="lg"
                  className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/movies">
                    <Play className="h-6 w-6 mr-3" />
                    Discover Movies Together
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-6 border-2 border-primary/30 hover:border-primary/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/chat">
                    <MessageCircle className="h-6 w-6 mr-3" />
                    Start Our Conversation
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/signup">
                    <Heart className="h-6 w-6 mr-3" fill="currentColor" />
                    Begin Our Journey
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-6 border-2 border-primary/30 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
                  asChild
                >
                  <Link href="/movies">Preview Our Collection</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Romantic Quote Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-heading text-foreground/90 italic mb-6">
              "In all the world, there is no heart for me like yours. In all the world, there is no love for you like
              mine."
            </blockquote>
            <cite className="text-lg text-muted-foreground">— Maya Angelou</cite>
            <div className="flex justify-center gap-2 mt-6">
              <Heart className="h-5 w-5 text-primary animate-pulse" fill="currentColor" />
              <Heart className="h-5 w-5 text-primary animate-pulse delay-200" fill="currentColor" />
              <Heart className="h-5 w-5 text-primary animate-pulse delay-500" fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
              Tonight's Romantic Picks
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Curated with love for your perfect evening together 💖
            </p>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Princess Bride",
                genre: "Romance • Adventure",
                year: "1987",
                rating: "8.1",
                poster: "/placeholder.svg?height=400&width=300",
                quote: "As you wish... 💕",
              },
              {
                title: "La La Land",
                genre: "Romance • Musical",
                year: "2016",
                rating: "8.0",
                poster: "/placeholder.svg?height=400&width=300",
                quote: "Here's to the ones who dream ✨",
              },
              {
                title: "The Notebook",
                genre: "Romance • Drama",
                year: "2004",
                rating: "7.8",
                poster: "/placeholder.svg?height=400&width=300",
                quote: "If you're a bird, I'm a bird 🕊️",
              },
            ].map((movie, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="bg-primary/90 rounded-full p-4 backdrop-blur-sm">
                        <Play className="h-8 w-8 text-white" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">⭐ {movie.rating}</span>
                    </div>
                  </div>
                  <CardHeader className="pb-6">
                    <CardTitle className="font-heading text-xl mb-2">{movie.title}</CardTitle>
                    <CardDescription className="text-base mb-3">
                      {movie.genre} • {movie.year}
                    </CardDescription>
                    <p className="text-primary/80 italic text-sm">{movie.quote}</p>
                  </CardHeader>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-4xl font-bold font-heading text-foreground mb-4">Made for Lovebirds Like You</h4>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature designed to bring you closer together through cinema
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="h-10 w-10 text-primary group-hover:animate-pulse" fill="currentColor" />
              </div>
              <h5 className="text-2xl font-bold font-heading mb-4 text-foreground">Personal Love Profiles</h5>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Create beautiful profiles showcasing your favorite romantic films, dream dates, and movie memories
                together 💕
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MessageCircle className="h-10 w-10 text-primary group-hover:animate-bounce" />
              </div>
              <h5 className="text-2xl font-bold font-heading mb-4 text-foreground">Sweet Movie Conversations</h5>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Share your thoughts, suggest date night movies, and create your own little world of cinema discussions
                ✨
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Coffee className="h-10 w-10 text-primary group-hover:animate-pulse" />
              </div>
              <h5 className="text-2xl font-bold font-heading mb-4 text-foreground">Cozy Movie Nights</h5>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Track your watched films, plan future date nights, and build a beautiful collection of shared memories
                🍿
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h6 className="text-3xl font-bold font-heading text-foreground mb-4">Ready to Write Your Love Story?</h6>
            <p className="text-xl text-muted-foreground mb-8">
              Every great romance needs the perfect movie collection. Start yours today! 🎬💖
            </p>
            {!session && (
              <Button
                size="lg"
                className="text-lg px-12 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300"
                asChild
              >
                <Link href="/signup">
                  <Sparkles className="h-6 w-6 mr-3" />
                  Begin Our Adventure
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
