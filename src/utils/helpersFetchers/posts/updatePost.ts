import axios from 'axios'
import { updatePost as updatePostInterface, dataUpdatePost } from '../../interfaces/posts';
// URL  
import { url_produciton } from '../baseUrl';
export const updatePost = async (data: updatePostInterface,): Promise<dataUpdatePost> => {
    const pid = data.pid
    const token = localStorage.getItem('jwt')
    const newContent = data.newContent
    try {
        const response = await axios.put(
            `${url_produciton}/api/posts/editPost/${pid}`, { newContent }
            , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};
