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
     * @param {Boolean} isPrivate if isPrivate is true then this function will get own posts. Otherwise it will get all posts.
     * @returns {function} the response of the request.
     */
    const getPosts = (isPrivate = false) => handleAxios({ method: 'GET', uri: `posts${isPrivate && '/me'}` })

    return {
        getPosts,
        createPost
    }
}