import { Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../../../../Hooks/useAlert";
import { useManageUsers } from "../../../../Hooks/useManageUsers";
import './Signup.css';

export const Signup = () => {
    const { showMessage } = useAlert();
    const { createUser } = useManageUsers();
    const navigate = useNavigate();
    const { handleSubmit, register, reset } = useForm();

    const handleSignup = data => {
        const notFilled = Object.keys(data).find(key => data[key] === '');
        if (notFilled) return showMessage('Please fill all fields.', 'error');
        if (data.password.length > 6) {
            createUser(data)
                .then(() => {
                    showMessage('Successfully registered.', 'success');
                    navigate('/login');
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
                        <h1 style={{ textAlign: 'center' }}>Signup</h1>
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
                            <TextField
                                label="Blood Group"
                                variant="standard"
                                name="bloodGroup"
                                {...register('bloodGroup')}
                                type="text"
                            />
                        </div>
                        <span>Already have an account? Please <Link to="/signin">login</Link>.</span>
                        <div className="signup-section-content-form-input">
                            <Button type="submit" variant="contained" color="primary">Signup</Button>
                        </div>
                    </form>
                </div>
            </section >
        </Container >
    )
};