import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './PostModal.css'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    padding: '5px 10px'
};

export const PostModal = ({ open, setOpen }) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h3 className="post-modal-head" style={{ textAlign: 'center' }}>Create post</h3>
                <div className="post-modal-body">
                    <div className="set-post-visibility">
                        <span>Post visibility:
                            <select>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </span>
                    </div>
                    <div className='set-post-description'>
                        <textarea placeholder='Describe . . .' rows={10} autoFocus />
                    </div>
                </div>
                <div className='pst-modal-bottom'>
                    <div className='post-modal-addphoto'>
                        <AddPhotoAlternateIcon />
                    </div>
                    <div className='post-modal-submit'>
                        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Submit</Button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}