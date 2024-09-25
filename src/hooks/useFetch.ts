import { useState, useEffect } from "react";

export const useFetch = <T,>(fetchData: () => Promise<T>, dependencies: unknown[] = []) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; // Avoid setting state on unmounted components
        const fetch = async () => {
            setLoading(true); // Indicate loading state
            setError(null); // Clear previous errors

            console.log("Fetching data..."); // Debug log

            try {
                const result = await fetchData();
                console.log("Fetched result:", result); // Log the result
                if (isMounted) {
                    setData(result); // Set new data if still mounted
                }
            } catch (err) {
                console.error("Error fetching:", err); // Log error
                if (isMounted) {
                    setError((err as Error).message); // Set error
                }
            } finally {
                if (isMounted) {
                    setLoading(false); // Clear loading state
                }
            }
        };

        fetch();

        return () => {
            isMounted = false; // Cleanup to avoid memory leaks
        };
    }, [fetchData, ...dependencies]); // Ensure dependencies are correctly managed

    return { data, loading, error };
};
