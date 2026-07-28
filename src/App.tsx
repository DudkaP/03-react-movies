import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal';
import { fetchMovies } from './services/movieService';
import type { Movie } from './types/movie';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
    setMovies([]);
    setSelectedMovie(null);

    try {
      const results = await fetchMovies(query);

      if (!results.length) {
        toast.error('No movies found for your request.');
        setMovies([]);
        return;
      }

      setMovies(results);
    } catch {
      setError(true);
      toast.error('There was an error, please try again...');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="app-shell">
      <SearchBar onSubmit={handleSearch} />
      <main className="main-content">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <MovieGrid onSelect={handleSelectMovie} movies={movies} />
        )}
      </main>
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
