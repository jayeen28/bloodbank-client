import { useAxios } from "./useAxios"

export const usePosts = () => {
    const handleAxios = useAxios();

    /**
     * This function is used for creating post.
     * @param {Object} data This object carries the necessary data for the post.
     * @returns 
     */
    const createPost = (data) => handleAxios({ method: 'POST', uri: 'posts', data })

    /**
     * This function is used for getting all the donation post.
     * @returns {function} the response of the request.
     */
    const getPosts = () => handleAxios({ method: 'GET', uri: 'posts' })

    return {
        getPosts,
        createPost
    }
}