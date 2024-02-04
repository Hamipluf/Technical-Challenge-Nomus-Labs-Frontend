import axios from 'axios'
import { dataUnlikePost } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const unlikePost = async (params: any): Promise<dataUnlikePost> => {
    const pid: number = params.queryKey[1]

    try {
        const response = await axios.post(
            `${url_produciton}/api/posts/unlikePost/${pid}`
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};