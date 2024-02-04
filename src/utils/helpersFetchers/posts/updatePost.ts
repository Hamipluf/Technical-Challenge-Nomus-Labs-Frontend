import axios from 'axios'
import { updatePost as updatePostInterface, dataUpdatePost } from '../../interfaces/posts';
// URL  
import { url_produciton } from '../baseUrl';
export const updatePost = async (data: updatePostInterface,): Promise<dataUpdatePost> => {
    const tid = data.pid
    try {
        const response = await axios.post(
            `${url_produciton}/api/posts/editPost/${tid}`,
            data.content
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};