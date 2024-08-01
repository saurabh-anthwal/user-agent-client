import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
    id: number;
    username: string;
    email: string;
    // Add other user fields as necessary
}

export interface AuthenticationContextProps {
    user: User | null;
    accessToken: string | null;
    error: string | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    register: (credentials: { name: string; email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps | undefined>(undefined);

interface AuthenticationProviderProps {
    children: ReactNode;
}

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter()

    useEffect(() => {
        checkIfUserLoggedIn();
    }, []);

    // Login User
    const login = async ({ email, password }: { email: string; password: string }) => {
        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const body = { email, password };

        try {
            const { data: accessResponse } = await axios.post('http://localhost:3000/api/login', body, config);

            if (accessResponse && accessResponse.user) {
                setUser(accessResponse.user);
            }

            if (accessResponse && accessResponse.access) {
                setAccessToken(accessResponse.access);
            }

            router.push('/');
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                return;
            } else if (error.request) {
                setError('Something went wrong');
                return;
            } else {
                setError('Something went wrong');
                console.log(error);
                return;
            }
        }
    };


    const register = async ({ name, email, password }: { name: string; email: string; password: string }) => {
        // if (password !== password2) {
        //     setError('Passwords do not match');
        //     return;
        // }
        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const body = { name, email, password };

        try {
            await axios.post('http://localhost:3000/api/register', body, config);
            login({ email, password });
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                return;
            } else if (error.request) {
                setError('Something went wrong');
                return;
            } else {
                setError('Something went wrong');
                return;
            }
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:3000/api/logout');
            setUser(null);
            setAccessToken(null);
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                return;
            } else if (error.request) {
                setError('Something went wrong');
                return;
            } else {
                setError('Something went wrong');
                return;
            }
        }
    };

    const checkIfUserLoggedIn = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/user');
            setUser(data.user);
            setAccessToken(data.access);
            router.push('/');
        } catch (error: any) {
            if (error.response && error.response.data) {
                return;
            } else if (error.request) {
                return;
            } else {
                return;
            }
        }
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <AuthenticationContext.Provider value={{ user, accessToken, error, login, register, logout, clearError }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationContext;