import { useCallback } from "react"; // Import useCallback
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchMovieDetails } from "../services/movieService";
import { Movie } from "../types/Movie";

const MovieDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const fetchDetails = useCallback(() => fetchMovieDetails(Number(id)), [id]); // Memoize fetch function

    const { data: movie, loading, error } = useFetch<Movie>(fetchDetails, [fetchDetails]);

    if (loading) {
        console.log("Loading movie details..."); // Log loading state
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("Error fetching movie details:", error); // Log any error
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
    );
};

export default MovieDetailsPage;
