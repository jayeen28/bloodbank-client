import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../Pages/Auth/ErrorPage/ErrorPage";
import { Signin } from "../Pages/Auth/Signin/Signin";
import { Signup } from "../Pages/Auth/Signup/Signup";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Donors } from "../Pages/Donors/Donors";
import { Home } from "../Pages/Home/Home";
import { Profile } from "../Pages/Profile/Profile";
import { TimeLine } from "../Pages/TimeLine/TimeLine";
import { Header } from "./Header/Header";
import { PrivateRoute } from "./PrivateRoute";

export const Routings = () => {
    return (
        <main className='App-main'>
            <Routes>
                <Route path="/" element={<><Header /><Home /></>} />
                <Route path="/home" element={<><Header /><Home /></>} />
                <Route path="/signin" element={<><Header /><Signin /></>} />
                <Route path="/signup" element={<><Header /><Signup /></>} />
                <Route path="/donors" element={<><Header /><Donors /></>} />
                <Route path="/time-line" element={<><Header /><TimeLine /></>} />
                <Route path="/profile" element={<><Header /><PrivateRoute><Profile /></PrivateRoute></>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="*" element={<><Header /><ErrorPage /></>} />
            </Routes>
        </main>
    )
};