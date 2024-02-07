import axios from "axios";
import {
  createNotificaiton,
  formNotificationCreate,
} from "../../interfaces/notifications";
// URL
import { url_produciton } from "../baseUrl";
export const createNotification = async (
  data: formNotificationCreate
): Promise<createNotificaiton> => {
  const token = localStorage.getItem("jwt");

  const senderId: number = data.senderId;
  const type: string = data.type;
  const postId: number = data.senderId;
  const commentId: number | undefined = data.commentId;

  const urlParsed = commentId
    ? `${url_produciton}/api/notifications/createNotification/${senderId}/${type}/${postId}/${commentId}`
    : `${url_produciton}/api/notifications/createNotification/${senderId}/${type}/${postId}`;

  try {
    const response = await axios.post(
      urlParsed,
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
