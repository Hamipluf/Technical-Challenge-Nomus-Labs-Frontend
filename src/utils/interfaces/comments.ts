interface response {
    success: boolean,
    code: number,
    message: string,
}

export interface comment {
    id: number,
    user_id: number,
    post_id: number,
    content: string,
    created_at: Date,
    commenter_username: string,
    commenter_is_private: boolean
}
export interface addComment {
    content: string
    pid: number
}
export interface dataAddComment extends response {
    data: comment
}
export interface getCommentOfPost extends response {
    data: [comment]
}
