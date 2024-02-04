interface response {
    success: boolean,
    code: number,
    message: string,
}

interface comment {
    id: number,
    user_id: number,
    post_id: number,
    content: string,
    created_at: Date
}
export interface addComment {
    content: string
    cid: number
}
export interface dataAddComment extends response {
    data: comment
}
export interface getCommentOfPost extends response {
    data: [comment]
}
