import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './PostModal.css'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button } from '@mui/material';
import { usePosts } from '../../../Hooks/usePosts';
import { useForm } from 'react-hook-form';
import { useAlert } from '../../../Hooks/useAlert';
import { useState } from 'react';
import { uploadImg } from '../../../helpers/uploadImg';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    padding: '10px 10px',
    outline: 'none'
};

export const PostModal = ({ open, setOpen }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const { createPost } = usePosts();
    const { handleSubmit, reset, register } = useForm();
    const { showMessage } = useAlert();

    const showImage = e => {
        const file = e.target.files[0];
        setImgSrc(URL.createObjectURL(file))
    }

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const { data: { data: { display_url } } } = await uploadImg(data.image[0])
            data.image = display_url;
            createPost(data)
                .then(({ data }) => {
                    setOpen(false);
                    setImgSrc(null)
                    reset();
                })
                .catch(() => showMessage('Something went wrong. Please try again!', 'error'))
                .finally(() => setIsLoading(false))
        }
        catch (e) { showMessage('Something went wrong. Please try again!', 'error') }
    }
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ cursor: isLoading ? 'progress' : 'auto' }}>
                    <h3 className="post-modal-head" style={{ textAlign: 'center', marginTop: '0px' }}>Create post</h3>
                    <div className="post-modal-body">
                        <div className="set-post-visibility">
                            <span>Post visibility:
                                <select {...register('visibility')}>
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </span>
                        </div>
                        <div className='set-post-description'>
                            <textarea placeholder='Describe . . .' rows={10} autoFocus {...register('description')} />
                        </div>
                    </div>
                    <div className='pst-modal-bottom'>
                        <div className='post-modal-addphoto'>
                            <input type="file" id="imageSelect" style={{ display: 'none' }} {...register("image", {
                                onChange: e => showImage(e)
                            })} />
                            {imgSrc && <img src={imgSrc} style={{ width: '20%' }} />}
                            <label htmlFor='imageSelect'>
                                <AddPhotoAlternateIcon sx={{ cursor: 'pointer' }} />
                            </label>
                        </div>
                        <div className='post-modal-submit'>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={() => setOpen(true)}
                                disabled={isLoading}
                            >Submit</Button>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}