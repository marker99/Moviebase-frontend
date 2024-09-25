interface FilterButtonsProps {
    currentFilter: string;
    setFilter: (filter: string) => void;
}

const filters = ['popular', 'now-playing', 'top-rated', 'upcoming'];

export default function FilterButtons({ currentFilter, setFilter }: FilterButtonsProps) {
    return (
        <div className="flex space-x-4 justify-center ">
            {filters.map(filter => (
                <button key={filter}
                    className={`px-4 py-2 rounded-full  ${currentFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter(filter)}
                >
                    {filter.replace('-', ' ').toUpperCase()}
                </button>
            ))}
        </div>
    )
}