import { prisma } from "../lib/prisma"

const sampleMovies = [
  {
    title: "The Princess Bride",
    description:
      "A classic fairy tale adventure with romance, comedy, and swashbuckling action. When a young woman is kidnapped, her true love embarks on a quest to rescue her.",
    poster: "/placeholder.svg?height=400&width=300",
    backdrop: "/placeholder.svg?height=400&width=800",
    genre: ["Romance", "Adventure", "Comedy"],
    year: 1987,
    rating: 8.1,
    duration: 98,
  },
  {
    title: "Casablanca",
    description:
      "A timeless romantic drama set in wartime Morocco. An American expatriate must choose between his love for a woman and helping her husband escape the Nazis.",
    poster: "/placeholder.svg?height=400&width=300",
    backdrop: "/placeholder.svg?height=400&width=800",
    genre: ["Romance", "Drama"],
    year: 1942,
    rating: 8.5,
    duration: 102,
  },
  {
    title: "When Harry Met Sally",
    description:
      "A romantic comedy about friendship and love in New York City. Can men and women really be just friends?",
    poster: "/placeholder.svg?height=400&width=300",
    backdrop: "/placeholder.svg?height=400&width=800",
    genre: ["Romance", "Comedy"],
    year: 1989,
    rating: 7.7,
    duration: 96,
  },
  {
    title: "The Notebook",
    description:
      "A passionate love story that spans decades. An elderly man reads to a woman with dementia from a notebook detailing their courtship.",
    poster: "/placeholder.svg?height=400&width=300",
    backdrop: "/placeholder.svg?height=400&width=800",
    genre: ["Romance", "Drama"],
    year: 2004,
    rating: 7.8,
    duration: 123,
  },
  {
    title: "Inception",
    description:
      "A mind-bending thriller about dreams within dreams. A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    poster: "/placeholder.svg?height=400&width=300",
    backdrop: "/placeholder.svg?height=400&width=800",
    genre: ["Sci-Fi", "Thriller"],
    year: 2010,
    rating: 8.8,
    duration: 148,
  },
  {
    title: "La La Land",
    description:
      "A modern musical about love and dreams in Los Angeles. A jazz musician and an aspiring actress fall in love while pursuing their dreams.",
    poster: "/placeholder.svg?height=400&width=300",
    backdrop: "/placeholder.svg?height=400&width=800",
    genre: ["Romance", "Musical", "Drama"],
    year: 2016,
    rating: 8.0,
    duration: 128,
  },
]

async function seedMovies() {
  console.log("Seeding movies...")

  for (const movieData of sampleMovies) {
    const existingMovie = await prisma.movie.findFirst({
      where: { title: movieData.title },
    })

    if (!existingMovie) {
      await prisma.movie.create({
        data: movieData,
      })
      console.log(`Created movie: ${movieData.title}`)
    } else {
      console.log(`Movie already exists: ${movieData.title}`)
    }
  }

  console.log("Movie seeding completed!")
}

seedMovies()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
