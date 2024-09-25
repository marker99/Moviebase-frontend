import { Movie } from '../types/Movie';
import MovieCard from "../components/MovieCard";
import { fetchMoviesByList } from '../services/movieService';
import { useFetch } from '../hooks/useFetch';
import { useState, useCallback } from 'react';
import FilterButtons from '../components/FilterButtons';

const MoviesPage = () => {
    const [filter, setFilter] = useState<string>('popular');

    // Memoize fetchMoviesByList so it doesn't change on every render
    const fetchMovies = useCallback(() => fetchMoviesByList(filter), [filter]);

    // Pass a static array of dependencies to useFetch
    const { data: movies, loading, error } = useFetch<Movie[]>(fetchMovies, [filter]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div> {/* Spinner */}
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4 max-w-screen-xl mx-auto space-y-4">

            {/* Filter buttons */}
            <FilterButtons currentFilter={filter} setFilter={setFilter} />

            {/* Movie cards */}
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} title={movie.title} posterPath={movie.poster_path} id={movie.id} score={movie.vote_average} />
                ))}
            </div>
        </div>
    );
};

export default MoviesPage;
