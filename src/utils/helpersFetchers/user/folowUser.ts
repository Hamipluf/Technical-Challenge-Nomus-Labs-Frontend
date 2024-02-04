import axios from 'axios'
import { dataFolowUser } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';
export const followUser = async (params: any): Promise<dataFolowUser> => {
    const uid: number = params.queryKey[1]
    try {
        const response = await axios.post(
            `${url_produciton}/api/users/follow/${uid}`,
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};