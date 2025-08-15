"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { FavoriteMovies } from "@/components/dashboard/favorite-movies"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Play, User, Settings, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Stats {
  favoritesCount: number
  watchHistoryCount: number
  messagesCount: number
  recentActivity: Array<{
    id: string
    watchedAt: string
    movie: {
      id: string
      title: string
      poster: string
      rating: number
      year: number
    }
  }>
}

interface Profile {
  id: string
  name: string
  email: string
  avatar?: string
  favorites: Array<{
    movie: {
      id: string
      title: string
      poster: string
      rating: number
      year: number
      genre: string[]
    }
  }>
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, profileResponse] = await Promise.all([fetch("/api/stats"), fetch("/api/profile")])

        const [statsData, profileData] = await Promise.all([statsResponse.json(), profileResponse.json()])

        setStats(statsData)
        setProfile(profileData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchData()
    }
  }, [session])

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Please Sign In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">You need to be signed in to access your dashboard.</p>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
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
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold font-heading">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <Settings className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-heading mb-2">Welcome back, {profile?.name}!</h2>
          <p className="text-muted-foreground">Here's what's been happening with your movie journey.</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Favorite Movies"
              value={stats.favoritesCount}
              icon={Heart}
              description="Movies you've loved"
            />
            <StatsCard
              title="Movies Watched"
              value={stats.watchHistoryCount}
              icon={Play}
              description="Your viewing history"
            />
            <StatsCard
              title="Messages Sent"
              value={stats.messagesCount}
              icon={MessageCircle}
              description="Chat conversations"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button asChild className="h-20 flex-col gap-2">
            <Link href="/movies">
              <Play className="h-6 w-6" />
              Browse Movies
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-20 flex-col gap-2 bg-transparent">
            <Link href="/chat">
              <MessageCircle className="h-6 w-6" />
              Start Chat
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-20 flex-col gap-2 bg-transparent">
            <Link href="/movies/favorites">
              <Heart className="h-6 w-6" />
              My Favorites
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-20 flex-col gap-2 bg-transparent">
            <Link href="/profile">
              <User className="h-6 w-6" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          {stats && <RecentActivity activities={stats.recentActivity} />}

          {/* Favorite Movies */}
          {profile && <FavoriteMovies movies={profile.favorites.map((f) => f.movie)} />}
        </div>
      </div>
    </div>
  )
}
