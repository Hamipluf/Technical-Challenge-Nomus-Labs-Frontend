import axios from 'axios'
import { responseGetImage } from '../../interfaces/user';
import { url_produciton } from '../baseUrl';

const getImage = async (): Promise<responseGetImage> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `${url_produciton}/api/users/getProfilePicture`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};
export default getImage