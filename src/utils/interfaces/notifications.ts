interface response {
    success: boolean,
    code: number,
    message: string,
}

interface notification {
    id: number,
    user_id: number,
    sender_id: number,
    type: string,
    post_id: number
}
export interface createNotificaiton extends response {
    data: notification
}

export interface getUnreadNotification extends response {
    data: [notification]
}

export interface markNotificationsAsRead extends getUnreadNotification { }