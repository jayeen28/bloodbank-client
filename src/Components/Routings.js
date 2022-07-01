import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../Pages/Auth/ErrorPage/ErrorPage";
import { Signin } from "../Pages/Auth/Signin/Signin";
import { Signup } from "../Pages/Auth/Signup/Signup";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Donors } from "../Pages/Donors/Donors";
import { Home } from "../Pages/Home/Home";
import { Profile } from "../Pages/Profile/Profile";
import { TimeLine } from "../Pages/TimeLine/TimeLine";
import { PrivateRoute } from "./PrivateRoute";

export const Routings = () => {
    return (
        <main className='App-main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/donors" element={<Donors />} />
                <Route path="/time-line" element={<TimeLine />} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </main>
    )
};