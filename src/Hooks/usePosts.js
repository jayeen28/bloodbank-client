import { useAxios } from "./useAxios"

export const usePosts = () => {
    const handleAxios = useAxios();

    /**
     * This function is used for getting all the donation post.
     * @returns {function} the response of the request.
     */
    const getPosts = () => {
        return handleAxios({ method: 'get', uri: 'posts' })
    }

    return {
        getPosts
    }
}