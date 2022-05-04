import { useEffect, useState } from "react";
import { useManageUsers } from "../../../Hooks/useManageUsers";

export const Donors = () => {
    const [donors, setDonors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getDonors } = useManageUsers();

    useEffect(() => {
        setIsLoading(true);
        getDonors('Dhaka-1202')
            .then(({ data }) => setDonors(data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [])
    if (isLoading) return 'Loading...';
    console.log(donors)
    return (
        <div>
            <h1>Donors</h1>
        </div>
    )
}