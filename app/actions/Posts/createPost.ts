"use server"

import { IPost,env } from "@/utils/types"

export const createPost = async (post:IPost) => {
    try{
        const response = await fetch(`${env.SUPABASE_URL}/Posts`,{
            method:"POST",
            headers:{
                "apikey": env.SUPABASE_KEY,
                "Authorization":`Bearer ${env.SUPABASE_KEY}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title:post.title,
                description:post.description,
                body:post.body,
                user_id:post.user_id,
                username:post.username,
                user_avatar:post.user_avatar
            })
        })

        if(response.status === 201){
            return true
        }

        return false
    }catch{
        return false
    }
}