import { Movie } from "../types/Movie";

// Fetch popular movies
export const fetchPopularMovies = async (): Promise<Movie[]> => {
    const response = await fetch('http://localhost:3000/api/movies/popular');
    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }
    const data = await response.json();
    return data;
};

// Fetch details for a specific movie
export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
    const response = await fetch(`http://localhost:3000/api/movies/movie/${movieId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data;
};