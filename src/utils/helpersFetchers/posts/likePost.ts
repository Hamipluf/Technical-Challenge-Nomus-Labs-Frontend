import axios from 'axios'
import { dataLikePost } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const likePost = async (pid: number): Promise<dataLikePost> => {
    const token = localStorage.getItem('jwt')

    try {
        const response = await axios.post(
            `${url_produciton}/api/posts/likePost/${pid}`, {},
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