import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { token, user } = useAuth();

    const storedUser = typeof window !== "undefined"
        ? (() => {
            try {
                return JSON.parse(localStorage.getItem("user") || "null");
            } catch {
                return null;
            }
        })()
        : null;

    const activeUser = user ?? storedUser;
    const normalizedRole = activeUser?.role?.toString().trim().toLowerCase();
    const isAdmin = normalizedRole === "admin" || normalizedRole === "superadmin";

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!activeUser || !isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;