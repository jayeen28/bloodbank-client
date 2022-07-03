import { Container, LinearProgress, TablePagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import './Donors.css';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";
import { useManageUsers } from "../../Hooks/useManageUsers";
import { CardUser } from "../../Components/CardUser/CardUser";

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
                            <div className="pageHead">
                                <h1>Donors</h1>
                            </div>
                        </div>
                        <div className="donors-section-content-header-right">
                            <form onSubmit={handleSubmit(handleSearch)} className="donor-search-wrapper">
                                <TextField id="standard-basic" label="Search" variant="standard" {...register('text')} />
                                <button type="submit" style={{ backgroundColor: 'transparent', border: 'none', color: 'gray' }}>
                                    <SearchIcon sx={{ marginBottom: { sm: '-16px', md: '-22px' }, '&:hover': { color: 'white', cursor: 'pointer' } }} />
                                </button>
                            </form>
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
                                        <CardUser user={donor} />
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

                {totalDocs > 10 && <div className="donors-section-footer">
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
                </div>}
            </section>
        </Container>
    )
}