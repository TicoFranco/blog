import {z} from 'zod'

export const createCommentSchema = z.object({
    postId:z.string(),
    body:z.string().min(1,{error:"the body must have at least one character"})
})