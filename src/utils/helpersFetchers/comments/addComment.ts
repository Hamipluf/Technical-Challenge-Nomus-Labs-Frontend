import axios from 'axios'
import { addComment as addCommentInterface, dataAddComment } from '../../interfaces/comments';
// URL
import { url_produciton } from '../baseUrl';
<<<<<<< HEAD
export const addComment = async (data: addCommentInterface): Promise<dataAddComment> => {
    const pid = data.pid
    const token = localStorage.getItem('jwt')

    try {
        const response = await axios.post(
            `${url_produciton}/api/comments/addComment/${pid}`,
            data.content,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
=======
export const addCOmment = async (data: addCommentInterface): Promise<dataAddComment> => {
    const pid = data.pid
    try {
        const response = await axios.post(
            `${url_produciton}/api/comments/addComment/${pid}`,
            data.content
>>>>>>> 06face86fc61cc7bf8aaf7352df415baf4b2cbc0
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};
