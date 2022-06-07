import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./Auth/ErrorPage/ErrorPage";
import { Signin } from "./Auth/Signin/Signin";
import { Signup } from "./Auth/Signup/Signup";
import { Dashboard } from "./Dashboard/Dashboard";
import { Donors } from "./Donors/Donors";
import { Home } from "./Home/Home";
import { Profile } from "./Profile/Profile";
import { TimeLine } from "./TimeLine/TimeLine";

export const Main = () => {
    return (
        <main className='App-main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/donors" element={<Donors />} />
                <Route path="/time-line" element={<TimeLine />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </main>
    )
};