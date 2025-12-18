import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const loggedInUser = await loginUser(email, password);
        setUser(loggedInUser);
        return loggedInUser;
    };

    const register = async (userData) => {
        const registeredUser = await registerUser(userData);
        setUser(registeredUser);
        return registeredUser;
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
