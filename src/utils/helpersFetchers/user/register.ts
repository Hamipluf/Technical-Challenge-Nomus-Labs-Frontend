import axios from 'axios'
import { dataRegister, formUser } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';
export const register = async (data: formUser): Promise<dataRegister> => {
    console
    try {
        const response = await axios.post(
            `${url_produciton}/api/users/register`,
            data
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};