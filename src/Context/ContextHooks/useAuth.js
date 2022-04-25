import { useContext } from "react"
import { authContext } from "../AuthProvider";
/**
 * This function is used to prevent usecontext import repeatation
 * @returns {function} useContext It contains all the data that has been returned from useAuthentication
 */
const useAuth = () => {
    return useContext(authContext)
}
export default useAuth;