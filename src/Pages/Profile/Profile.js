import { Button, Container, Switch } from '@mui/material';
import { useForm } from 'react-hook-form';
import './Profile.css';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import useAuth from '../../Context/ContextHooks/useAuth';
import { useEffect, useState } from 'react';
import { useManageUsers } from '../../Hooks/useManageUsers';
import { uploadImg } from '../../helpers/uploadImg';
import { BGOptions } from '../../Components/BGOptions/BGOptions';

export const Profile = () => {
    const [imgSrc, setImgSrc] = useState(null);
    const { register, handleSubmit, setValue } = useForm();
    const { user, isLoading } = useAuth();
    const { updateUser } = useManageUsers();
    const [discard, setDiscard] = useState(false);

    useEffect(() => {
        setValue('name', user.name)
        setValue('email', user.email)
        setValue('dob', user.dob ? user.dob.split(/[T ]/i, 1)[0] : '')
        setValue('phone', user.phone)
        setValue('address', user.address)
        setValue('bloodGroup', user.bloodGroup)
    }, [discard]);

    const showImage = e => {
        const file = e.target.files[0];
        setImgSrc(URL.createObjectURL(file))
    }

    const onSubmit = async data => {
        if (data.image[0]) {
            const { data: { data: { display_url } } } = await uploadImg(data.image[0])
            data.avatar = display_url;
        }
        delete data.image;
        //removed undefined elements
        Object.keys(data).forEach(key => (!data[key] && data[key] !== false) && delete data[key])
        if (!data.dob) data.dob = null;
        updateUser(data)
        setImgSrc(null)
    }
    return (
        <Container>
            <section className="profile">
                <div className="profile-header">
                    <div className="pageHead">
                        <h1>Profile</h1>
                    </div>
                </div>
                <div className="update-profile-informations">
                    <form onSubmit={handleSubmit(onSubmit)} className="profileImage-input-form">
                        <div className="profile-information-setting">
                            <div className="profile-image-management">
                                <div className="profile-image-show">
                                    <img src={imgSrc || user.avatar || "https://www.w3schools.com/howto/img_avatar.png"} alt="profileImage" style={{ width: '100%', height: '100%' }} id="profileImageDisplay" />
                                    <label htmlFor="profileImage" className='profile-image-select'><CameraAltOutlinedIcon />Upload photo</label>
                                    <input type="file" style={{ display: 'none' }} id="profileImage" {...register('image', {
                                        onChange: e => showImage(e)
                                    })} />
                                </div>
                            </div>
                            <div className="profile-text-managements">
                                <div className='profile-text-input-left-wraper'>
                                    <div className="Profile-input-wrapper">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" name="name" {...register('name')} autoFocus />
                                    </div>
                                    <div className="Profile-input-wrapper">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" id="email" name="email" {...register('email')} />
                                    </div>
                                    <div className="Profile-input-wrapper">
                                        <label htmlFor="password">Password</label>
                                        <input type="text" id="password" name="password" {...register('password')} />
                                    </div>
                                    <div className="Profile-input-wrapper">
                                        <label htmlFor="dob">DOB</label>
                                        <input type="date" id="dob" name="dob" {...register('dob')} />
                                    </div>
                                </div>
                                <div className='profile-text-input-right-wraper'>
                                    <div className="Profile-input-wrapper">
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" id="phone" name="phone" {...register('phone')} />
                                    </div>
                                    <div className="Profile-input-wrapper">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" id="address" name="address" {...register('address')} />
                                    </div>
                                    <div className="Profile-input-wrapper">
                                        <label htmlFor="bloodGroup" >Blood Group</label>
                                        <select id="bloodGroup" name="bloodGroup" {...register('bloodGroup')}>
                                            <BGOptions />
                                        </select>
                                    </div>
                                    <div className="Profile-input-wrapper">
                                        <p style={{ margin: '0px' }}>
                                            Donating?<Switch color="warning" {...register('donating')} defaultChecked={user.donating} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-info-submit-cancel">
                            <Button variant="contained" color="secondary" className="profile-update-button" onClick={() => setDiscard(discard => !discard)}>Discard</Button>
                            <Button type='submit' variant="contained" color="primary" className="profile-update-button" disabled={isLoading}>Save</Button>
                        </div>
                    </form>
                </div>
            </section>
        </Container>
    )
}