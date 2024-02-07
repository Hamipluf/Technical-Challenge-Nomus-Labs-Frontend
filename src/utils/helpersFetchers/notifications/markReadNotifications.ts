import axios from "axios";
import { markNotificationsAsRead } from "../../interfaces/notifications";
// URL
import { url_produciton } from "../baseUrl";
export const marReadNotifications =
  async (): Promise<markNotificationsAsRead> => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.post(
        `${url_produciton}/api/notifications/markNotificationsAsRead`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
