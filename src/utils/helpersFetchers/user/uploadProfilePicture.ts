import axios from 'axios'
import { responseUploadImage } from '../../interfaces/user';
import { url_produciton } from '../baseUrl';

const uploadImage = async (formData: FormData | {}): Promise<responseUploadImage> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `${url_produciton}/api/users/uploadProfilePicture`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};
export default uploadImage