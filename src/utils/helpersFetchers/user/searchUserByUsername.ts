import axios from 'axios'
import { dataSearchUser } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';
export const searchUserByUsername = async (params: any): Promise<dataSearchUser> => {
    const username: number = params.queryKey[1]
    try {
        const response = await axios.get(
            `${url_produciton}/api/users/search/${username}`,
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};