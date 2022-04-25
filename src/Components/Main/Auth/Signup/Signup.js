import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAlert } from "../../../../Hooks/useAlert";
import { useManageUsers } from "../../../../Hooks/useManageUsers";

export const Signup = () => {
    const { showMessage } = useAlert();
    const { createUser } = useManageUsers();
    const { handleSubmit, register, reset } = useForm();

    const handleSignup = data => {
        if (data.password.length > 6) {
            createUser(data)
                .then(() => {
                    showMessage('Successfully registered. Please wait till approval.', 'success');
                    reset();
                })
                .catch(() => {
                    showMessage('Something went wrong while sign up', 'error');
                })
        }
        else {
            showMessage('Password should be at least 7 characters long', 'error');
        }
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit(handleSignup)}>
                <input type="text" name="name" {...register("name")} required />
                <input type="email" name="email" {...register("email")} required />
                <input type="password" name="password"  {...register("password")} required />
                <input type="submit" />
            </form>
            <p>Already have an account? Please <Link to='/login'>Login</Link></p>
        </div>
    )
};