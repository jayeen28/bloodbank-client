import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { DashBar } from './DashBar/DashBar';
import { DashBody } from './DashBody/DashBody';
import { DashHead } from './DashHead/DashHead';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export function Dashboard() {
    const [open, setOpen] = useState(false);
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        setMenus(menu => [...menu,
        {
            title: "Status",
            icon: <ShowChartIcon />,
            path: "/dashboard"
        },
        {
            title: "Posts",
            icon: <DynamicFeedIcon />,
            path: "/dashboard/posts"
        }
        ])
    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <DashHead open={open} handleDrawerOpen={handleDrawerOpen} />
            <DashBar open={open} handleDrawerClose={handleDrawerClose} DrawerHeader={DrawerHeader} menus={menus} />
            <DashBody DrawerHeader={DrawerHeader} />
        </Box>
    );
}
