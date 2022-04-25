import axios from "axios";
import useAuth from "../Context/ContextHooks/useAuth";

export const useAxios = () => {
    const auth = useAuth();
    /**
     * This function is used to prevent axios repetition
     * @param {string} method The method of the axios request.
     * @param {string} uri The uri of the axios request. 
     * @param {object} data It containes the  data while need to post update and many more. 
     * @returns {function} axios This is the proper axios function depending on the params.
     */

    //handle axios 
    const handleAxios = ({ method, uri, data }) => {
        var payload = {
            method,
            url: `${process.env.REACT_APP_SERVER_URL}/${uri}`,
            data
        }
        if (auth?.user) { payload.headers = { "Authorization": `Bearer ${auth?.user?.token}` } }
        return axios(payload)
    }
    return handleAxios;
}