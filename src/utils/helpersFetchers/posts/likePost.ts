import axios from 'axios'
import { dataLikePost } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const likePost = async (params: any): Promise<dataLikePost> => {
    const pid: number = params.queryKey[1]

    try {
        const response = await axios.post(
            `${url_produciton}/api/posts/likePost/${pid}`
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};