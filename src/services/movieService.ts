import axios, { type AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface MovieApiResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error('TMDB token is missing.');
  }

  const response: AxiosResponse<MovieApiResponse> = await axios.get(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.results;
};
