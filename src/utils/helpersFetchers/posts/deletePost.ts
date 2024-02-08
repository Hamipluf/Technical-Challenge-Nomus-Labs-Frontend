import axios from 'axios'
import { dataDeletePost } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const deletePost = async (data: number): Promise<dataDeletePost> => {
    const pid: number = data
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.delete(
            `${url_produciton}/api/posts/deletePost/${pid}`, {
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