import axios from 'axios'
import { getCommentOfPost as getCommentOfPostInterface } from '../../interfaces/comments';
// URL
import { url_produciton } from '../baseUrl';
export const getCommentOfPost = async (params: any): Promise<getCommentOfPostInterface> => {
    const pid: number = params.queryKey[1]
    const token = localStorage.getItem('jwt')

    try {
        const response = await axios.get(
            `${url_produciton}/api/comments/getPostComments/${pid}`, {
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