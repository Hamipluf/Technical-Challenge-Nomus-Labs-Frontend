import axios from 'axios'
import { dataLogin, formUser } from '../../interfaces/user';
// URL
import { url_produciton } from '../baseUrl';

export const loginUser = async (data: formUser): Promise<dataLogin> => {
    try {
        const response = await axios.post(
            `${url_produciton}/api/users/login`,
            data
        );
        if (response.data.data.token) {
            localStorage.setItem("jwt", response.data.data.token);
        }
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};