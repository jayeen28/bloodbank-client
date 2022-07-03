import axios from "axios"
export const uploadImg = async (image) => {
    const formData = new FormData();
    formData.append('image', image)
    return await axios({
        method: 'POST',
        url: `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB}`,
        data: formData
    })
}