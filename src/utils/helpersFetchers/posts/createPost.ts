import axios from 'axios'
import { createPost, dataCreatePost } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const register = async (data: createPost): Promise<dataCreatePost> => {
    try {
        const response = await axios.post(
            `${url_produciton}/api/posts/createPost`,
            data
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};