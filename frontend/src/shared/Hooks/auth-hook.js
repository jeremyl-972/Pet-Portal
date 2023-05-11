import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';

let logOutTimer;

export const useAuth = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    const login = useCallback(async (user, token, expirationDate) => {
        if(user.role === 'admin'){
            setIsAdmin(true);
        };
        setUser(user);
        setToken(token);
        const tokenExpireDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpireDate);
        await localforage.setItem(
            'userData',
            {
                user: user,
                token: token,
                expiration: tokenExpireDate.toISOString()
            }
        );
    }, []);

    const logout = useCallback(async () => {
        navigate('/');
        setIsAdmin(false);
        setUser(null);
        setToken(null);
        setTokenExpirationDate(null);
        await localforage.removeItem('userData');
    }, [navigate]);

    //setting the logout timer
    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logOutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logOutTimer);
        };
    }, [login, token, tokenExpirationDate, logout]);

    //auto login on app reload
    useEffect(() => {
        const getUserData = async () => {
            const storedData = await localforage.getItem('userData');
            if (
                storedData &&
                storedData.token &&
                new Date(storedData.expiration) > new Date()
            ) {
                login(storedData.user, storedData.token, new Date(storedData.expiration));
            };
        };
        getUserData();
    }, [login]);

    return {
        User: user,
        token: token,
        isAdmin: isAdmin,
        login: login,
        logout: logout
    }
};

