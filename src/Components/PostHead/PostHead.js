import PostAddIcon from '@mui/icons-material/PostAdd';
import { Tooltip } from '@mui/material';
import { useState } from "react";
import { PostModal } from "./PostModal/PostModal";
import './PostHead.css';

export const PostHead = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="post-head">
            <div className="create-post-btn-wrapper">
                <Tooltip title="Add post" placement='left'>
                    <PostAddIcon onClick={() => setOpen(true)} sx={{ color: 'white', cursor: 'pointer' }} fontSize="large" />
                </Tooltip>
            </div>
            <PostModal open={open} setOpen={setOpen} />
        </div>
    )
}