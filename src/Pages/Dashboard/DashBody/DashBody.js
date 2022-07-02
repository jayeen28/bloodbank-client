import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const DashBody = ({ DrawerHeader }) => {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Outlet />
        </Box>
    )
}