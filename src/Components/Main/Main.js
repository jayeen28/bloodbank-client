import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./Auth/ErrorPage/ErrorPage";
import { Login } from "./Auth/Login/Login";
import { Signup } from "./Auth/Signup/Signup";
import { Home } from "./Home/Home";

export const Main = () => {
    return (
        <main className='App-main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </main>
    )
};