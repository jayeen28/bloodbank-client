import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/ContextHooks/useAuth";
import { useAlert } from "./useAlert";
import { useAxios } from "./useAxios";
/**
 * This hook manages the user events
 * @returns {function} updateUser This function is used for updating the user.
 * @returns {function} userLogin This function handles the user login.
 * @returns {function} createUser This function handles the user registration.
 * @returns {function} readProfile This function is used for reading user profile.
 * @returns {function} userLogout This function is used for logging out the current user.
 * @returns {function} logOutAll This function is used for logging out user from all the devices he has logged in.
 * @returns {function} getImgName This function is used for getting the user name and image.
 * @returns {function} getUserList This function is used for getting user list.
 * @returns {function} delOrDeactivate This function is used for deleting or deactivating any user.
 * @returns {function} approveUser This function is used for approving any user.
 * @returns {function} userRoleChange This function is used for changing user role.
 * @returns {function} userImage This function is used for getting user image.
 * @returns {function} addUser This function is used for adding user.
 */
export const useManageUsers = () => {
    const navigate = useNavigate();
    const handleAxios = useAxios();
    const { showMessage } = useAlert();
    const { setUser, setisLoading, setImgLoading } = useAuth();

    //handle user login in 
    const userLogin = (data) => {
        setisLoading(true);
        return handleAxios({ method: 'post', uri: 'users/login', data })
    }

    //handle registration
    const createUser = (data) => handleAxios({ method: 'post', uri: 'users', data })
    //update user 
    const updateUser = (data) => {
        setisLoading(true);
        // update data without avatar
        handleAxios({ method: 'patch', uri: 'users/me', data })
            .then(({ data, config }) => {
                const token = config.headers.Authorization.split('Bearer ')[1];
                setUser({ ...data, token });
                showMessage('User updated successfully', 'success')
            })
            .catch((e) => showMessage('Something went wrong while updating user.', 'error'))
            .finally(() => setisLoading(false));
    }

    //read profile
    const readProfile = () => handleAxios({ method: 'get', uri: 'users/me' })
        .then((res) => console.log(res))
        .catch(() => showMessage('Sorry! something went wrong.', 'error'))

    //read profile as public
    const readProfileAsPublic = (id) => handleAxios({ method: 'get', uri: `users/${id}` })

    //logout user
    const userLogout = () => {
        setisLoading(true);
        handleAxios({ method: 'post', uri: 'users/logout', data: {} })
            .then(() => {
                navigate('/signin')
                Cookies.remove(process.env.REACT_APP_SHORT_NAME)
                setUser({});
            })
            .catch(() => showMessage('Something went wrong while logging out.', 'error'))
            .finally(() => setisLoading(false))
    }

    //logout from all sessions
    const logOutAll = () => handleAxios({ method: 'post', uri: 'users/logoutall' })
        .then(res => console.log(res))
        .then(() => showMessage('Something went wrong while logging out all users', 'error'))
    //get image and name
    const getImgName = (id) => handleAxios({ method: 'get', uri: `user/${id}/profile` })
    //get user list
    const getUserList = (userType, isActive) => handleAxios({ method: 'get', uri: `users?role=${userType}&active=${isActive}&sortBy=createdAt:desc` })
    //delete and deactivate a user
    const delOrDeactivate = (id, actionType) => handleAxios({ method: 'delete', uri: `users/${id}/${actionType}/` })
    //approve user
    const approveUser = (id, data) => handleAxios({ method: 'patch', uri: `users/${id}`, data })
    //change user role
    const userRoleChange = (id, data) => handleAxios({ method: 'patch', uri: `users/${id}`, data })
    //user image or image with name 
    const userImage = (id, type) => handleAxios({ method: 'get', uri: `user/${id}/${type}` })
    //get user in container or task
    const getUsers = (url) => handleAxios({ method: 'get', uri: url })
    /**
    * This function is used to send email to user so that user can know that he has assigned to a task.
    * @param {Object} data This object carries the necessary information for sending email.
    */
    const sendEmail = (data) => handleAxios({ method: 'POST', uri: 'email', data })
    /**
     * This function is used for getting donors list.
     * @param {String} search This string is used for searching donors.
     * @param {String} page This string indicates the page user wants.
     * @param {String} limit This string indicates how many results will come for one page.
     */
    const getDonors = (search = "Dhaka", group, page = '0', limit = '10') => handleAxios({ method: 'get', uri: `donors?search=${search}&group=${group}&page=${page}&limit=${limit}` })

    return {
        updateUser,
        userLogin,
        createUser,
        readProfile,
        userLogout,
        logOutAll,
        getImgName,
        getUserList,
        delOrDeactivate,
        approveUser,
        userRoleChange,
        userImage,
        getUsers,
        readProfileAsPublic,
        sendEmail,
        getDonors
    }
}