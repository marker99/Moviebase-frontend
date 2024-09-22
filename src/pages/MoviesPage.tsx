import { Movie } from '../types/Movie';
import MovieCard from "../components/MovieCard";
import { fetchPopularMovies } from '../services/movieService';
import { useFetch } from '../hooks/useFetch';

const MoviesPage = () => {
    const { data: movies, loading, error } = useFetch<Movie[]>(fetchPopularMovies);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-12 gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies?.map(movie => (
                <MovieCard key={movie.id} title={movie.title} posterPath={movie.poster_path} id={movie.id} />
            ))}
        </div>
    )
};

export default MoviesPage;