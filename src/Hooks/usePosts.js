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
    const getPosts = (page, limit, isPrivate = false, status = 'all') => handleAxios({ method: 'GET', uri: `posts${isPrivate ? '/me' : ''}?page=${page}&&limit=${limit}&&status=${status}` })

    /**
     * This function is used for updating post.
     */
    const updatePost = (id, data) => handleAxios({ method: 'PATCH', uri: `posts/${id}`, data })

    return {
        getPosts,
        createPost,
        updatePost
    }
}