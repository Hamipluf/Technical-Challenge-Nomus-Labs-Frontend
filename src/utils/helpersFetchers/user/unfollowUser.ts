import axios from 'axios'
import { dataUnflowUser } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';
export const unfollowUser = async (params: any): Promise<dataUnflowUser> => {
    const uid: number = params.queryKey[1]
    try {
        const response = await axios.post(
            `${url_produciton}/api/users/unfollow/${uid}`,
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};