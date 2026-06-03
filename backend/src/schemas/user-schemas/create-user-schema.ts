import {z} from 'zod'

export const createUserSchema = z.object({
    email:z.email({error:'invalid email syntax.'}),
    name:z.string()
       .min(4,{error:'The username must have at least 4 characters.'})
       .max(20,{error:'The username can have a maximum of 20 characters.'}),
    password:z.string()
       .min(4,{error:'The password must have at least 4 characters.'})
       .max(15,{error:'The password can have a maximum of 15 characters.'})
       .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
          {error:'The password must contain at least one uppercase letter, one lowercase letter, and one number.'}),
    avatarUrl:z.string().regex(/^\/avatar_[1-4]\.png$/,{error:'invalid avatar'})
})