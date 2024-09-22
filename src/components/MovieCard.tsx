import { useNavigate } from "react-router-dom";

interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
}

export default function MovieCard({ id, title, posterPath }: MovieCardProps) {
    const posterUrl = `https://image.tmdb.org/t/p/w400${posterPath}`;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${id}`); // Navigate to the movie details page
    }

    return (
        // MovieCard
        <div onClick={handleClick} className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden">

            <img className="w-full max-h-screen object-contain" src={posterUrl} alt={title} />

            <h2 className="p-4 text-lg font-semibold">{title}</h2>
        </div>
    )
}