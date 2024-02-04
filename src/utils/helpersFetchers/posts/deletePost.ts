import axios from 'axios'
import { dataDeletePost } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const deletePost = async (params: any): Promise<dataDeletePost> => {
    const pid: number = params.queryKey[1]
    try {
        const response = await axios.delete(
            `${url_produciton}/api/posts/deletePost/${pid}`
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};