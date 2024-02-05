import axios from 'axios'
import { dataFeed } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const getFeed = async (): Promise<dataFeed> => {
    const token = localStorage.getItem('jwt')
    try {
        const response = await axios.get(
            `${url_produciton}/api/posts/feed`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response)
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};