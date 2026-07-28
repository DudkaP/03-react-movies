import type { KeyboardEvent } from 'react';
import type { Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const fallbackPoster = 'https://placehold.co/500x750?text=No+Poster';

const MovieGrid = ({ onSelect, movies }: MovieGridProps) => {
  if (!movies.length) {
    return null;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, movie: Movie) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(movie);
    }
  };

  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <div
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(movie)}
            onKeyDown={(event) => handleKeyDown(event, movie)}
          >
            <img
              className={styles.image}
              src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackPoster}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
