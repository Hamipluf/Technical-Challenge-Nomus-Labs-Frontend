import axios from 'axios'
import { getLikesOfPost as getLikeOfPostInterfa } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const getLikesOfPost = async (params: any): Promise<getLikeOfPostInterfa> => {
    const token = localStorage.getItem('jwt')
    const postId: number = params.queryKey[1]
    try {
        const response = await axios.get(
            `${url_produciton}/api/posts/getPostLikes/${postId}`,
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