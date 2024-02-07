interface response {
  success: boolean;
  code: number;
  message: string;
}

export interface notification {
  comment_content: string | null;
  comment_created_at: Date | null;
  comment_id: number | null;
  is_private: boolean;
  is_read: boolean;
  notification_created_at: Date;
  notification_id: number;
  post_content: string;
  post_created_at: Date;
  post_id: number;
  type: string;
  user_id: number;
  username: string;
}
export interface formNotificationCreate {
  senderId: number;
  postId: number;
  type: string;
  commentId?: number;
}
export interface createNotificaiton extends response {
  data: notification;
}

export interface getUnreadNotification extends response {
  data: [notification];
}

export interface markNotificationsAsRead extends getUnreadNotification {}
