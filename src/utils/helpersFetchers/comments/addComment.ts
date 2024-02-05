import axios from 'axios'
import { addComment as addCommentInterface, dataAddComment } from '../../interfaces/comments';
// URL
import { url_produciton } from '../baseUrl';
export const addCOmment = async (data: addCommentInterface): Promise<dataAddComment> => {
    const pid = data.pid
    try {
        const response = await axios.post(
            `${url_produciton}/api/comments/addComment/${pid}`,
            data.content
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};
