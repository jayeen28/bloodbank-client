import { toast } from 'react-toastify';

export const useAlert = () => {
    const showMessage = (message, type) => {
        if (!['success', 'error'].includes(type)) return toast.error('Invalid variant.')
        toast[`${type}`](message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return {
        showMessage
    }
}