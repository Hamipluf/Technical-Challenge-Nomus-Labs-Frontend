import axios from 'axios'
import { addComment as addCommentInterface, dataAddComment } from '../../interfaces/comments';
// URL
import { url_produciton } from '../baseUrl';
export const addComment = async (data: addCommentInterface): Promise<dataAddComment> => {
    const pid = data.pid
    const token = localStorage.getItem('jwt')
    const { content } = data

    try {
        const response = await axios.post(
            `${url_produciton}/api/comments/addComment/${pid}`,
            { content },
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
