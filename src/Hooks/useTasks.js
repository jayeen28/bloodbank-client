import { useAxios } from "./useAxios";

export const useTask = () => {
    const handleAxios = useAxios();
    /**
     * This function is used for creating task.
     * @param {Object} data The data is used for creating task. 
     * @returns It returns the response of the request.
     */
    const createTask = (data) => {
        return handleAxios({ method: 'post', uri: 'tasks', data });
    }
    return {
        createTask
    }
}