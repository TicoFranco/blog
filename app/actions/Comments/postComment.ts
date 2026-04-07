"use server"

import { IComment,env } from "@/utils/types"

export const postComment = async (comment:IComment) => {
    try{
        const response = await fetch(`${env.SUPABASE_URL}/Comments`,{
            method:"POST",
            headers:{
                "apikey": env.SUPABASE_KEY,
                "Authorization":`Bearer ${env.SUPABASE_KEY}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:comment.username,
                user_avatar:comment.user_avatar,
                user_id:comment.user_id,
                post_id:comment.post_id,
                body:comment.body
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