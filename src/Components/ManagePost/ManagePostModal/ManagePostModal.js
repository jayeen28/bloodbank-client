import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadImg } from '../../../helpers/uploadImg';
import { useAlert } from '../../../Hooks/useAlert';
import { usePosts } from '../../../Hooks/usePosts';
import { BGOptions } from '../../BGOptions/BGOptions';
import './ManagePostModal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { sm: 'maxContent', md: 600 },
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    padding: '10px 10px',
    outline: 'none'
};

export const ManagePostModal = ({ modalData, setModalData, setPosts }) => {
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
            if (data.image[0]) {
                const { data: { data: { display_url } } } = await uploadImg(data.image[0])
                data.image = display_url;
            } else delete data.image
            Object.keys(data).forEach(key => !data[key] && delete data[key])
            createPost(data)
                .then(({ data }) => {
                    setPosts(posts => [data, ...posts])
                    showMessage('Posted successfully.', 'success')
                    setModalData(data => ({ action: null, open: false }));
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
            open={modalData.open}
            onClose={() => { setModalData(data => ({ action: null, open: false })); reset() }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ cursor: isLoading ? 'progress' : 'auto' }}>
                    <h3 className="post-modal-head" style={{ textAlign: 'center', marginTop: '0px' }}>Create post</h3>
                    <div className="post-modal-body">
                        <div className="set-post-selection">
                            <span>Post visibility:
                                <select {...register('visibility')}>
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </span>
                        </div>
                        <div className="set-post-selection">
                            <span>Blood group:
                                <select {...register('bloodGroup')}>
                                    <BGOptions />
                                </select>
                            </span>
                        </div>
                        <div className='set-post-content'>
                            <input placeholder='Address' {...register('address')} required />
                            <textarea placeholder='Describe . . .' rows={10} {...register('content')} />
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
                                // onClick={() => setOpen(true)}
                                disabled={isLoading}
                            >Submit</Button>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}