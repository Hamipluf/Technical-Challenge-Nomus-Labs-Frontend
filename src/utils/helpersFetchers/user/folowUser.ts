import axios from 'axios'
import { dataFolowUser } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';
export const followUser = async (uid: number): Promise<dataFolowUser> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.post(
            `${url_produciton}/api/users/follow/${uid}`, {}, {
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