import PostAddIcon from '@mui/icons-material/PostAdd';
import { Tooltip } from '@mui/material';
import { useState } from "react";
import { ManagePostModal } from "./ManagePostModal/ManagePostModal";
import './ManagePost.css';

export const ManagePost = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="post-head">
            <div className="create-post-btn-wrapper">
                <Tooltip title="Add post" placement='left'>
                    <PostAddIcon onClick={() => setOpen(true)} sx={{ color: 'white', cursor: 'pointer' }} fontSize="large" />
                </Tooltip>
            </div>
            <ManagePostModal open={open} setOpen={setOpen} />
        </div>
    )
}