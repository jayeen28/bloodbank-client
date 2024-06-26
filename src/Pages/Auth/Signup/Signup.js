import { Button, Container, FormControl, InputLabel, MenuItem, Select, Switch, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../../../Hooks/useAlert";
import { useManageUsers } from "../../../Hooks/useManageUsers";
import './Signup.css';

export const Signup = () => {
    const [bloodGroup, setBloodGroup] = useState('');
    const { showMessage } = useAlert();
    const { createUser } = useManageUsers();
    const navigate = useNavigate();
    const { handleSubmit, register, reset } = useForm();

    const handleChange = (event) => {
        setBloodGroup(event.target.value);
    };

    const handleSignup = data => {
        data.bloodGroup = bloodGroup;
        const notFilled = Object.keys(data).find(key => data[key] === '');
        if (notFilled) return showMessage('Please fill all fields.', 'error');
        if (data.password.length > 6) {
            createUser(data)
                .then(() => {
                    showMessage('Successfully registered.', 'success');
                    navigate('/signin');
                    reset();
                })
                .catch(({ response: { data } }) => {
                    showMessage(data, 'error');
                })
        }
        else {
            showMessage('Password should be at least 7 characters long', 'error');
        }
    }

    return (
        <Container>
            <section className="signup-section">
                <div className="signup-section-head">
                    <div className="pageHead">
                        <h1 style={{ textAlign: 'center' }}>Sign up</h1>
                    </div>
                </div>
                <div className="signup-section-content">
                    <form onSubmit={handleSubmit(handleSignup)} className="signup-section-content-form">
                        <div className="signup-section-content-form-input">
                            <TextField
                                label="Name"
                                variant="standard"
                                name="name"
                                {...register('name')}
                                autoComplete="name"
                                autoFocus
                            />
                        </div>
                        <div className="signup-section-content-form-input">
                            <TextField
                                label="Email"
                                variant="standard"
                                name="email"
                                {...register('email')}
                                autoComplete="email"
                            />
                        </div>
                        <div className="signup-section-content-form-input">
                            <TextField
                                label="Password"
                                variant="standard"
                                name="password"
                                {...register('password')}
                                autoComplete="current-password"
                                type="password"
                            />
                        </div>
                        <div className="signup-section-content-form-input">
                            <TextField
                                label="Phone"
                                variant="standard"
                                name="phone"
                                {...register('phone')}
                                defaultValue="01"
                                type="text"
                            />
                        </div>
                        <div className="signup-section-content-form-input">
                            <TextField
                                label="Address"
                                variant="standard"
                                name="address"
                                {...register('address')}
                                type="text"
                            />
                        </div>
                        <div className="signup-section-content-form-input">
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={bloodGroup}
                                    label="Blood Group"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'A+'}>A+</MenuItem>
                                    <MenuItem value={'A-'}>A-</MenuItem>
                                    <MenuItem value={'B+'}>B+</MenuItem>
                                    <MenuItem value={'B-'}>B-</MenuItem>
                                    <MenuItem value={'O+'}>O+</MenuItem>
                                    <MenuItem value={'O-'}>O-</MenuItem>
                                    <MenuItem value={'AB+'}>AB+</MenuItem>
                                    <MenuItem value={'AB-'}>AB-</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="signup-section-content-form-input">
                            <p style={{ margin: '0px' }}>
                                Are you ready to donate?<Tooltip title="You can turn this on or off when ever you want at the profile page."><Switch defaultChecked color="warning" {...register('donating')} /></Tooltip>
                            </p>
                        </div>
                        <span>Already have an account? Please <Link to="/signin">Sign in</Link>.</span>
                        <div className="signup-section-content-form-input">
                            <Button type="submit" variant="contained" color="primary">Sign up</Button>
                        </div>
                    </form>
                </div>
            </section >
        </Container >
    )
};