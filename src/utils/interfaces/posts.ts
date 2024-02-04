interface response {
    success: boolean,
    code: number,
    message: string,
}
interface posts {
    id: number,
    content: string,
    created_at: Date,
    username: string
}
interface like {
    id: number,
    user_id: number,
    post_id: number,
    created_at: Date
}
export interface createPost {
    content: string
}
export interface updatePost extends createPost {
    pid: number
}

export interface dataCreatePost extends response {
    data: {
        id: number,
        user_id: number,
        content: string,
        created_at: Date
    }
}

export interface dataFeed extends response {
    data: {
        pag: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        totalPages: number,
        totalDocuments: number,
        posts: [posts]
    }

}
export interface dataUpdatePost extends dataCreatePost {

}

export interface dataLikePost extends response {
    data: like
}
export interface dataUnlikePost extends dataLikePost { }

export interface getLikesOfPost extends response {
    data: [like]
}
export interface dataDeletePost extends response { }