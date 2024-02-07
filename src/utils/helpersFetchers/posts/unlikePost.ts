import axios from 'axios'
import { dataUnlikePost } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const unlikePost = async (pid: number): Promise<dataUnlikePost> => {
    const token = localStorage.getItem('jwt')

    try {
        const response = await axios.post(
            `${url_produciton}/api/posts/unlikePost/${pid}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};