import { useState, useEffect } from 'react';

export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null); // State to store the fetched data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState<string | null>(null); // State to store any error

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result); // Store fetched data in state
            } catch (error: any) {
                setError(error.message); // Set error message in state
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchData();
    }, [url]); // Re-fetch if the URL changes

    return { data, loading, error };
};

export const useFetchImage = (url: string) => {
    const [isImage, setIsImage] = useState<boolean | null>(null); // State to track if URL is an image
    const [imageLoading, setImageLoading] = useState(true); // State to track loading status
    const [errorImage, setErrorImage] = useState<string | null>(null); // State to store any error

    useEffect(() => {
        const checkIfImage = async () => {
            setImageLoading(true); // Start loading
            setErrorImage(null); // Clear any previous errors

            try {
                // Perform a HEAD request to check the headers of the resource
                const response = await fetch(url, { method: 'HEAD' });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Check if the Content-Type header indicates an image
                const contentType = response.headers.get('Content-Type');
                contentType && contentType.startsWith('image/') ? setIsImage(true) : setIsImage(false);
            } catch (error: any) {
                setIsImage(false); // If an error occurs, it's not an image
                setErrorImage(error.message); // Set the error message
            } finally {
                setImageLoading(false); // Set loading to false after the check is complete
            }
        };

        checkIfImage(); // Trigger the check when the component mounts or when `url` changes
    }, [url]); // Re-check if the URL changes

    return { isImage, imageLoading, errorImage };
};