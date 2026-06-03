import {z} from 'zod'

export const createPostSchema = z.object({
    title:z.string().min(1,{error:"The title must have at least 1 character."}).max(300,{error:"The title can have a maximum of 300 characters."}),
    description:z.string().min(1,{error:"The description must have at least 1 character."}).max(400,{error:"The description can have a maximum of 400 characters."}).optional(),
    body:z.string().min(1,{error:"The body must have at least 1 character."})
})