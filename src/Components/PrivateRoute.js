import { LinearProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import useAuth from "../Context/ContextHooks/useAuth";

export const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) return <LinearProgress color="inherit" />;
    return user.email ? children : <Navigate to="/login" />;
}