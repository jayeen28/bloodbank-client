import { Container, LinearProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useManageUsers } from "../../../Hooks/useManageUsers";
import './Donors.css';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";

export const Donors = () => {
    const [donors, setDonors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getDonors } = useManageUsers();
    const { register, handleSubmit } = useForm();

    const handleSearch = (data) => {
        setIsLoading(true);
        getDonors(data.text)
            .then(({ data }) => setDonors(data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }
    useEffect(() => handleSearch({ text: '' }), [])

    return (
        <Container>
            <section className="donors-section">
                <div className="donors-section-content">
                    <div className="donors-section-content-header">
                        <div className="donors-section-content-header-left">
                            <h1>Donors</h1>
                        </div>
                        <div className="donors-section-content-header-right">
                            <div className="donor-search-wrapper">
                                <form onSubmit={handleSubmit(handleSearch)}>
                                    <TextField id="standard-basic" label="Search" variant="standard" {...register('text')} />
                                    <button type="submit" style={{ backgroundColor: 'transparent', border: 'none', color: 'gray' }}>
                                        <SearchIcon sx={{ marginBottom: '-26px', '&:hover': { color: 'white', cursor: 'pointer' } }} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {
                        isLoading && <LinearProgress />
                    }
                    <div className="donors-section-content-body">
                        <div className="donors-section-content-body-list">
                            {
                                donors?.map(donor =>
                                    <div className="donor-card" key={donor._id}>
                                        <div className="donor-card-header">
                                            <div className="donor-card-header-left">
                                                <div className="donor-card-header-left-content">
                                                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="donor-photo" />
                                                </div>
                                            </div>
                                            <div className="donor-card-header-right">
                                                <div className="donor-card-header-right-content">
                                                    <h2>{donor.name}</h2>
                                                    <span>{donor.bloodGroup}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="donor-card-body">
                                            <div className="donor-card-body-content">
                                                <p>Address: {donor.address}</p>
                                                <p>Phone: {donor.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}