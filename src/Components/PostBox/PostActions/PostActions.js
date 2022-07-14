import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Button } from '@mui/material';
import { usePosts } from '../../../Hooks/usePosts';
import { useAlert } from '../../../Hooks/useAlert';
import { remove } from 'jayeen-arraystate';

const options = [
    'Edit',
    'Delete'
];

export const PostActions = ({ post, setPosts }) => {
    const [isFul, setIsFul] = useState(post.status === 'fulfilled');
    const [isLoading, setIsLoading] = useState(false);
    const { updatePost, deletePost } = usePosts();
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

    const handleDelete = () => {
        setIsLoading(true);
        deletePost(post._id)
            .then(({ data }) => {
                showMessage('Post deleted', 'success');
                remove(setPosts, data._id);
            })
            .catch((e) => showMessage(e.message, 'error'))
            .finally(() => setIsLoading(false))
    }
    const handleEdit = () => console.log('edit')
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
                        <MenuItem
                            key={option}
                            selected={option === 'Pyxis'}
                            onClick={() => {
                                handleClose();
                                option === "Edit" ? handleEdit() : handleDelete()
                            }}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </div>
    );
}