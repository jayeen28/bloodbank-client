import PostAddIcon from '@mui/icons-material/PostAdd';
import { Tooltip } from '@mui/material';
import './ManagePost.css';
import { ManagePostModal } from "./ManagePostModal/ManagePostModal";

export const ManagePost = ({ setPosts, modalData, setModalData }) => {
    return (
        <div className="post-head">
            <div className="create-post-btn-wrapper">
                <Tooltip title="Add post" placement='left'>
                    <PostAddIcon onClick={() => setModalData(data => ({ action: 'create', open: true }))} sx={{ color: 'white', cursor: 'pointer' }} fontSize="large" />
                </Tooltip>
            </div>
            <ManagePostModal modalData={modalData} setModalData={setModalData} setPosts={setPosts} />
        </div>
    )
}