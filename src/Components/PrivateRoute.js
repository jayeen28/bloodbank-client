import { Navigate } from "react-router-dom";
import useAuth from "../Context/ContextHooks/useAuth";

export const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) return 'Loading . . .';
    return user.email ? children : <Navigate to="/login" />;
}