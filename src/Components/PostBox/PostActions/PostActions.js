import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Button } from '@mui/material';
import { usePosts } from '../../../Hooks/usePosts';
import { useAlert } from '../../../Hooks/useAlert';

const options = [
    'Edit',
    'Delete'
];

export const PostActions = ({ post }) => {
    const [isFul, setIsFul] = useState(post.status === 'fulfilled');
    const [isLoading, setIsLoading] = useState(false);
    const { updatePost } = usePosts();
    const { showMessage } = useAlert();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleStat = (status) => {
        setIsLoading(true);
        updatePost(post._id, { status })
            .then(({ data }) => {
                setIsFul(data.status === 'fulfilled')
                showMessage('Post status updated.', 'success')
            })
            .catch(e => showMessage('Something went wrong.', 'error'))
            .finally(() => setIsLoading(false))
    }

    return (
        <div className='post-actions'>
            <div className='status-btn-wrapper'>
                <Button
                    size="small"
                    sx={{
                        textTransform: 'capitalize'
                    }}
                    disabled={isLoading}
                    onClick={() => handleStat(isFul ? 'pending' : 'fulfilled')}
                >{isFul ? 'Repost' : 'Fulfil'}</Button>
            </div>
            <div className='other-actions-wrapper'>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {options.map((option) => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </div>
    );
}