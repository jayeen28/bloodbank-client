import cryptoJs from "crypto-js";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../Context/ContextHooks/useAuth";
import { useAlert } from "../../../../Hooks/useAlert";
import { useManageUsers } from "../../../../Hooks/useManageUsers";

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
        Cookies.set('flex', encryptedToken, { expires: cookieDuration });
        setUser({ ...user, token })
    }
    const handleLogin = data => {
        //handle user login function
        userLogin(data)
            .then(({ data }) => {
                manageLogedIndata(data)
            })
            .catch(() => {
                setisLoading(false);
                showMessage('Please input your credentials properly.', 'error')
            })
            .finally(() => {
                setisLoading(false);
                // redirect user to where he has came from
                navigate('/trade');
            })
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <input type="email" name="email" {...register("email")} required />
                <input type="password" name="password"  {...register("password")} required />
                <input type="submit" />
            </form>
            <p>Don't have any account? Please <Link to='/signup'>Signup</Link></p>
        </div>
    )
}