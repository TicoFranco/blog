import {z} from 'zod'

export const updateCommentSchema = z.object({
    id:z.string(),
    body:z.string().min(1,{error:"the body must have at least one character"})
})