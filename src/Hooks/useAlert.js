export const useAlert = () => {
    const showMessage = (message, type) => {
        console.log(message);
    }
    return {
        showMessage
    }
}