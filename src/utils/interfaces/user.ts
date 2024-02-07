interface response {
    success: boolean,
    code: number,
    message: string,
}

export interface follower {
    user_id: number,
    follower_username: string,
    is_private: boolean
}
export interface user {
    id: number,
    username: string
}

export interface formUser {
    username: string,
    password: string
}

export interface currentUser extends response {
    data: {
        currentUserId: number,
        token: string
    }
}

export interface dataLogin extends response {
    data: {
        token: string,
        userId: number,
        username: string
    }
}

export interface dataRegister extends response {
    data: {
        id: number,
        username: string
    }
}

export interface dataFolowUser extends response {
    data: {
        id: number,
        user_id: number,
        target_user_id: number,
        created_at: Date
    }
}

export interface dataUnflowUser extends dataFolowUser { }

export interface dataGetFollowers extends response {
    data: follower[]
}

export interface dataSearchUser extends response {
    data: user[]
}

export interface dataChangePrivacity extends response {
    data: {
        is_private: boolean,
        username: string
    }
}

