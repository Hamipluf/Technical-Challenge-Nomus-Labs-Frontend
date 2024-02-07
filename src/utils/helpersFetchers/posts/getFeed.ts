import axios from 'axios'
import { dataFeed } from '../../interfaces/posts';
// URL
import { url_produciton } from '../baseUrl';
export const getFeed = async (params: any): Promise<dataFeed> => {
    const token = localStorage.getItem('jwt')
    const limit: number = params.queryKey[1]
    const offset: number = params.queryKey[2]



    const urlParsed = limit && offset
        ? `${url_produciton}/api/posts/feed?limit=${limit}&offset=${offset}`
        : `${url_produciton}/api/posts/feed`;

    try {
        const response = await axios.get(
            urlParsed,
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