import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = (regModal, closeRM, logModal, closeLM) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method, body, headers, modalType) => {
        if (method === 'POST') {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
            try {
                const response = await fetch(url, { method, body, headers, signal: httpAbortCtrl.signal });
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setIsLoading(false);
                if (modalType) { closeRM(); closeLM(); };
                return (responseData);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
                if (modalType === 'reg') {
                    regModal();
                };
                if (modalType === 'log') {
                    logModal();
                };
                throw error
            };
        } else if (method === 'PUT') {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
            try {
                const response = await fetch(url, { method, body, headers, signal: httpAbortCtrl.signal });
                const responseData = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(ctrl => ctrl !== httpAbortCtrl);
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setIsLoading(false);
                return (responseData);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
                throw error;
            };
        } else {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
            try {
                const response = await fetch(url, { method, body, headers, signal: httpAbortCtrl.signal });
                const responseData = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(ctrl => ctrl !== httpAbortCtrl);
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setIsLoading(false);
                return (responseData);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
                throw error;
            };
        };
    }, [closeLM, closeRM, logModal, regModal]);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return ({
        isLoading,
        error,
        sendRequest,
        clearError
    });
};