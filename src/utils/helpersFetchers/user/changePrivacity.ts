import axios from 'axios'
import { dataChangePrivacity } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';
export const changePrivacity = async (data: boolean): Promise<dataChangePrivacity> => {
    const token = localStorage.getItem('jwt')


    try {
        const response = await axios.post(
            `${url_produciton}/api/users/updatePrivacy/${data}`, {}, {
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