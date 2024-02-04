import axios from 'axios'
import { markNotificationsAsRead } from '../../interfaces/notifications';
// URL
import { url_produciton } from '../baseUrl';
export const marReadNotifications = async (): Promise<markNotificationsAsRead> => {
    try {
        const response = await axios.post(
            `${url_produciton}/api/notifications/markNotificationsAsRead`,
        );
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
};