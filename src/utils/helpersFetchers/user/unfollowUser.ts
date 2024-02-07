import axios from 'axios'
import { dataUnflowUser } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';
export const unfollowUser = async (uid: number): Promise<dataUnflowUser> => {
    const token = localStorage.getItem('jwt')

    try {
        const response = await axios.post(
            `${url_produciton}/api/users/unfollow/${uid}`, {}, {
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