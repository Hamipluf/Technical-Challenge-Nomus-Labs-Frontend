import axios from 'axios'
import { createNotificaiton } from '../../interfaces/notifications';
// URL
import { url_produciton } from '../baseUrl';
export const createNotification = async (params: any): Promise<createNotificaiton> => {
    const senderId: number = params.queryKey[1]
    const type: number = params.queryKey[2]
    const postId: number = params.queryKey[3]
    const commentId: number | undefined = params.queryKey[4]

    const urlParsed = commentId
        ? `${url_produciton}/api/notifications/createNotification/${senderId}/${type}/${postId}/${commentId}`
        : `${url_produciton}/api/notifications/createNotification/${senderId}/${type}/${postId}`;

    try {
        const response = await axios.post(urlParsed);
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};