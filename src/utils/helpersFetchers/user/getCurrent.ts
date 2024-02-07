import axios from 'axios'
import { currentUser } from '../../interfaces/user';
import { url_produciton } from '../baseUrl';
export const getCurrent = async (): Promise<currentUser> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `${url_produciton}/api/users/current`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (response.data.data) {
            localStorage.setItem("jwt", response.data.data.token);
            localStorage.setItem("uid", response.data.data.user.id);
        }
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};