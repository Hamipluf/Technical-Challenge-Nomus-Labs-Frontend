import axios from 'axios'
import { dataFeed } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const register = async (): Promise<dataFeed> => {
    try {
        const response = await axios.get(
            `${url_produciton}/api/posts/feed`,
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};