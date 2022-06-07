import { Button, Container, TextField } from "@mui/material";
import cryptoJs from "crypto-js";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../Context/ContextHooks/useAuth";
import { useAlert } from "../../../../Hooks/useAlert";
import { useManageUsers } from "../../../../Hooks/useManageUsers";
import './Login.css';

export const Login = () => {
    const { register, handleSubmit } = useForm();
    const { userLogin, userLogout } = useManageUsers();
    const { setUser, setisLoading } = useAuth();
    const { showMessage } = useAlert();
    const navigate = useNavigate();
    let cookieDuration = 7;

    //manage user data after login
    const manageLogedIndata = (data) => {
        const { user, token } = data;
        // encrypt user token
        const encryptedToken = cryptoJs.AES.encrypt(JSON.stringify(token), `${process.env.ENCRYPTION_KEY}`).toString();
        Cookies.set(`${process.env.REACT_APP_SHORT_NAME}`, encryptedToken, { expires: cookieDuration });
        setUser({ ...user, token })
    }
    const handleLogin = data => {
        //handle user login function
        userLogin(data)
            .then(({ data }) => {
                manageLogedIndata(data);
                navigate(-1);
            })
            .catch(() => {
                setisLoading(false);
                showMessage('Please input your credentials properly.', 'error')
            })
            .finally(() => {
                setisLoading(false);
            })
    }
    return (
        <Container>
            <section className="login-section">
                <div className="login-section-head">
                    <div className="pageHead">
                        <h1 style={{ textAlign: 'center' }}>Login</h1>
                    </div>
                </div>
                <div className="login-section-content">
                    <form onSubmit={handleSubmit(handleLogin)} className="login-section-content-form">
                        <div className="login-section-content-form-input">
                            <TextField
                                label="Email"
                                variant="standard"
                                name="email"
                                {...register('email')}
                                autoComplete="email"
                                autoFocus
                            />
                        </div>
                        <div className="login-section-content-form-input">
                            <TextField
                                label="Password"
                                variant="standard"
                                name="password"
                                {...register('password')}
                                autoComplete="password"
                                type="password"
                            />
                        </div>
                        <span>Don't have an account? Please <Link to="/signup">signup</Link>.</span>
                        <div className="login-section-content-form-input">
                            <Button type="submit" variant="contained" color="primary">Login</Button>
                        </div>
                    </form>
                </div>
            </section>
        </Container>
    )
}