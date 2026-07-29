import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        if (typeof window === "undefined") {
            return null;
        }

        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Failed to parse saved user", error);
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        if (typeof window === "undefined") {
            return "";
        }

        return localStorage.getItem("token") || "";
    });

    useEffect(() => {

        if (typeof window === "undefined") {
            return;
        }

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error("Failed to parse saved user", error);
                localStorage.removeItem("user");
            }
        }

    }, []);

    const login = (userData, jwtToken) => {

        setUser(userData);
        setToken(jwtToken);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);
    };

    const logout = () => {

        setUser(null);
        setToken("");

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};