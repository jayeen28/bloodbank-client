import { Container, LinearProgress, TablePagination, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useManageUsers } from "../../../Hooks/useManageUsers";
import './Donors.css';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";

export const Donors = () => {
    const [donors, setDonors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getDonors } = useManageUsers();
    const { register, handleSubmit } = useForm();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalDocs, setTotalDocs] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (data) => {
        setIsLoading(true);
        getDonors(data.text)
            .then(({ data: { donors, total } }) => {
                setDonors(donors)
                setTotalDocs(total)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        setIsLoading(true);
        const searchText = document.getElementById('standard-basic').value || '';
        getDonors(searchText, page, rowsPerPage)
            .then(({ data: { donors, total } }) => {
                setDonors(donors)
                setTotalDocs(total)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [page, rowsPerPage])

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
                    {
                        !isLoading && donors.length === 0 && <span>No donors found</span>
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
                <div className="donors-section-footer">
                    <div className="pagination-wrapper">
                        <TablePagination
                            component="div"
                            count={totalDocs}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </section>
        </Container>
    )
}