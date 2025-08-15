-- SQL script to seed initial movie data for Debora and Nahom
-- This will be converted to Prisma operations in the actual implementation

-- Sample movies for the couple to enjoy
INSERT INTO movies (title, description, poster, genre, year, rating, duration) VALUES
('The Princess Bride', 'A classic fairy tale adventure with romance, comedy, and swashbuckling action.', '/placeholder.svg?height=400&width=300', '["Romance", "Adventure", "Comedy"]', 1987, 8.1, 98),
('Casablanca', 'A timeless romantic drama set in wartime Morocco.', '/placeholder.svg?height=400&width=300', '["Romance", "Drama"]', 1942, 8.5, 102),
('When Harry Met Sally', 'A romantic comedy about friendship and love in New York City.', '/placeholder.svg?height=400&width=300', '["Romance", "Comedy"]', 1989, 7.7, 96),
('The Notebook', 'A passionate love story that spans decades.', '/placeholder.svg?height=400&width=300', '["Romance", "Drama"]', 2004, 7.8, 123),
('Inception', 'A mind-bending thriller about dreams within dreams.', '/placeholder.svg?height=400&width=300', '["Sci-Fi", "Thriller"]', 2010, 8.8, 148),
('La La Land', 'A modern musical about love and dreams in Los Angeles.', '/placeholder.svg?height=400&width=300', '["Romance", "Musical", "Drama"]', 2016, 8.0, 128);
