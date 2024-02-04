import axios from 'axios'
import { dataChangePrivacity } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';
export const followUser = async (params: any): Promise<dataChangePrivacity> => {
    const privacity: number = params.queryKey[1]
    try {
        const response = await axios.post(
            `${url_produciton}/api/users/updatePrivacy/${privacity}`,
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};