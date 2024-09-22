import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchMovieDetails } from "../services/movieService";
import { Movie } from "../types/Movie";


const MovieDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movie, loading, error } = useFetch<Movie>(() => fetchMovieDetails(Number(id)));

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>No movie details found.</div>;
    }

    const posterUrl = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;

    return (
        <div className="p-8">
            <img className="w-full max-w-sm" src={posterUrl} alt={movie.title} />
            <h1 className="text-3xl font-bold my-4">{movie.title}</h1>
            <p className="text-lg">{movie.overview}</p>
            <p className="text-sm text-gray-500">Release Date: {movie.release_date}</p>
        </div>
    )
};

export default MovieDetailsPage;