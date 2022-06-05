import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom"
import Banner from "./Banner/Banner";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Banner />
        </Container>
    )
}