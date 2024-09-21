import { useEffect, useState } from "react";

type Movie = {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
};

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/movies/popular')
                const data = await response.json();
                setMovies(data);
                setLoading(false);
            } catch (err) {
                setError(`Failed to fetch popular movies. ${err}`);
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>

            <ul>
                {movies.map(movie => (
                    <li key={movie.id} className="mb-4">
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="inline-block mr-4"/>
                        <span className="text-lg font-semibold">{movie.title}</span>
                        <p>Release Date: {movie.release_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default MoviesPage;