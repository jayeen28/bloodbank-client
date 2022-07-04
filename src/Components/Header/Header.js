import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../Context/ContextHooks/useAuth';
import { useManageUsers } from '../../Hooks/useManageUsers';
import { Brand } from '../Brand/Brand';

const pages = [
    {
        title: 'Home',
        url: '/home'
    },
    {
        title: 'Donors',
        url: '/donors'
    },
    {
        title: 'Timeline',
        url: '/time-line'
    }
];
const settings = [
    {
        title: 'Profile',
        url: '/profile'
    },
    {
        title: 'Dashboard',
        url: '/dashboard'
    }
];

export const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { userLogout } = useManageUsers();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <header className="App-header">
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, mr: 3, display: { xs: 'none', md: 'flex' } }}
                        >
                            <Brand />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page.title}
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            navigate(page.url);
                                        }}>
                                        <Typography textAlign="center">
                                            {page.title}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                <Brand />
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0, mr: 4, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.title}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigate(page.url);
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block', textTransform: 'capitalize' }}
                                >
                                    {page.title}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {user.email ?
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar src={user.avatar} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map(setting => <MenuItem key={setting.title} onClick={() => {
                                            handleCloseUserMenu();
                                            navigate(setting.url);
                                        }}>
                                            <Typography textAlign="center">{setting.title}</Typography>
                                        </MenuItem>)}
                                        <MenuItem onClick={() => {
                                            handleCloseUserMenu();
                                            userLogout();
                                        }}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </> :
                                <Button variant="contained" color="primary" sx={{ textTransform: 'capitalize' }} onClick={() => navigate('/signin')}>
                                    Sign in
                                </Button>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    )
}; 