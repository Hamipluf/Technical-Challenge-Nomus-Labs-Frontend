import axios from "axios";
import { getUnreadNotification } from "../../interfaces/notifications";
// URL
import { url_produciton } from "../baseUrl";
export const getUreadNotification =
  async (): Promise<getUnreadNotification> => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(
        `${url_produciton}/api/notifications/getUnreadNotifications`,
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
