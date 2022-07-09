import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const Toaster = () => {
    return (
        <ToastContainer
            toastStyle={{ backgroundColor: "#1E1E1E" }}
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}