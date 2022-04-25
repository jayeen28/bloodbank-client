import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { Navigate } from "react-router-dom";
const CryptoJS = require("crypto-js");

/**
 * Authentication Hook
 * @returns {function} setUser It sets the user data to user state
 * @returns {function} setIsLoading It sets the isLoading state true or false while user management related function is processing with server.
 * @returns {function} setImgLoading It sets the imgLoading true or false while image is sending or getting from server.
 * @returns {variable} imgLoading It contains the the image loading current state.
 * @returns {variable} user It contains the user data.
 * @returns {variable} isLoading It contains the loading state while user management related functions are running.
 */
const useAuthentication = () => {
    //store user information
    const [user, setUser] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [imgLoading, setImgLoading] = useState(false);

    // Hold user info 
    useEffect(() => {
        setisLoading(true);
        const userToken = Cookies.get('flex');
        // if token doesn't exists in cookies then redirect user to login page
        if (userToken) {
            //decrypt user token from cookies
            const tokenBytes = CryptoJS.AES.decrypt(userToken, `${process.env.ENCRYPTION_KEY}`);
            const dycryptedToken = JSON.parse(tokenBytes.toString(CryptoJS.enc.Utf8));
            if (dycryptedToken) {
                axios.get(`${process.env.REACT_APP_SERVER_URL}/users/me`, {
                    headers: { 'Authorization': `Bearer ${dycryptedToken}` }
                })
                    .then(({ data, config }) => {
                        const token = config.headers.Authorization.split('Bearer ')[1];
                        //give user data to setUserAvatar function
                        setUser({ ...data, token })
                    })
                    .catch(() => {
                        <Navigate to='/login' />
                    })
                    .finally(() => setisLoading(false))
            }
        }
        else {
            setisLoading(false);
            <Navigate to='/login' />
        }
    }, []);

    return {
        setUser,
        setisLoading,
        setImgLoading,
        imgLoading,
        user,
        isLoading
    }
}

export default useAuthentication;