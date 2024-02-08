import axios from 'axios'
import { createPost as createPostInteface, dataCreatePost } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const createPost = async (data: createPostInteface): Promise<dataCreatePost> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `${url_produciton}/api/posts/createPost`,
            data, {
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