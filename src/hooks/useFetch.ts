import { useState, useEffect } from "react";

export const useFetch = <T,>(fetchData: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [fetchData]);

    return {
        data,
        loading,
        error
    };
};
