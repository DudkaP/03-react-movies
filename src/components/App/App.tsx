import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import styles from './App.module.css';

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
    <div className={styles.appShell}>
      <SearchBar onSubmit={handleSearch} />
      <main className={styles.mainContent}>
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
