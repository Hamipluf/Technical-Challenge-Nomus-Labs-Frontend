import axios from 'axios'
import { dataGetFollowers } from '../../interfaces/user';
import { url_produciton } from '../baseUrl';
export const getFollowers = async (): Promise<dataGetFollowers> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `${url_produciton}/api/users/followers`,
            {
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