import axios from 'axios'
import { dataChangePrivacity } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';
export const getPrivacity = async (): Promise<dataChangePrivacity> => {
    try {
        const response = await axios.get(
            `${url_produciton}/api/users/getUserPrivacy`,
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};