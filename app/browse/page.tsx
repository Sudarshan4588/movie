'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

interface User {
  name: string;
  username: string;
  email: string;
}

export default function BrowsePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

  useEffect(() => {
    checkAuth();
    fetchMovies();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchMovies = async () => {
    try {
      const [trendingRes, topRatedRes, popularRes] = await Promise.all([
        fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`),
        fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`),
        fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
      ]);

      const trendingData = await trendingRes.json();
      const topRatedData = await topRatedRes.json();
      const popularData = await popularRes.json();

      setTrending(trendingData.results || []);
      setTopRated(topRatedData.results || []);
      setPopular(popularData.results || []);
      setFeaturedMovie(trendingData.results[0] || null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-netflix-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center justify-between px-4 md:px-12 py-4">
          <h1 className="text-netflix-red text-2xl md:text-4xl font-bold">NETFLIX</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-white hidden md:block">
              Welcome, {user?.name}!
            </span>
            <button
              onClick={handleLogout}
              className="bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded transition text-sm md:text-base"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Featured Movie Banner */}
      {featuredMovie && (
        <div className="relative h-[80vh] w-full">
          <div className="absolute inset-0">
            <Image
              src={`${IMAGE_BASE_URL}original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
          </div>

          <div className="relative h-full flex items-center px-4 md:px-12 pt-20">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                {featuredMovie.title}
              </h2>
              <p className="text-base md:text-lg text-white/90 line-clamp-3">
                {featuredMovie.overview}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedMovie(featuredMovie)}
                  className="bg-white hover:bg-white/80 text-black px-6 md:px-8 py-2 md:py-3 rounded font-semibold transition flex items-center gap-2"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Play
                </button>
                <button
                  onClick={() => setSelectedMovie(featuredMovie)}
                  className="bg-gray-500/50 hover:bg-gray-500/80 text-white px-6 md:px-8 py-2 md:py-3 rounded font-semibold transition flex items-center gap-2"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="relative -mt-32 space-y-8 md:space-y-12 px-4 md:px-12 pb-12">
        <MovieRow title="Trending Now" movies={trending} onMovieClick={setSelectedMovie} />
        <MovieRow title="Top Rated" movies={topRated} onMovieClick={setSelectedMovie} />
        <MovieRow title="Popular Movies" movies={popular} onMovieClick={setSelectedMovie} />
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

function MovieRow({ title, movies, onMovieClick }: { 
  title: string; 
  movies: Movie[]; 
  onMovieClick: (movie: Movie) => void;
}) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="space-y-2 md:space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-white">{title}</h3>
      <div className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide pb-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="min-w-[150px] md:min-w-[200px] cursor-pointer transition-transform hover:scale-105"
          >
            <div className="relative aspect-[2/3] rounded overflow-hidden">
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieModal({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="bg-netflix-darkGray rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-video">
          <Image
            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white rounded-full p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 md:p-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{movie.title}</h2>
          
          <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="text-green-500 font-semibold">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span className="text-gray-400">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
          
          <p className="text-white/90 text-base md:text-lg leading-relaxed">
            {movie.overview}
          </p>
          
          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-white hover:bg-white/80 text-black px-6 py-3 rounded font-semibold transition flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
