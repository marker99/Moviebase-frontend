import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
    score: number;
}

export default function MovieCard({ id, title, posterPath, score }: MovieCardProps) {
    const [isVisible, setIsVisible] = useState(false);

    const posterUrl = `https://image.tmdb.org/t/p/w400${posterPath}`;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${id}`); // Navigate to the movie details page
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 100); // Small delay to trigger the fade-in effect
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div onClick={handleClick} className={`movie-card cursor-pointer bg-white shadow-md rounded-lg overflow-hidden ${isVisible ? 'show' : ''}`}>
            <img className="w-full max-h-fit object-contain" src={posterUrl} alt={title} />

            <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-gray-600">Score: {score.toFixed(1)}</p>
            </div>
        </div>
    )
}