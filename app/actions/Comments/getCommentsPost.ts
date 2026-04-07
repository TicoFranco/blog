"use server"

import { IComment,env } from "@/utils/types"

export const getCommentsPost = async (post_id:string) => {
    try{
        const response = await fetch(`${env.SUPABASE_URL}/Comments?post_id=eq.${post_id}&select=username,user_avatar,created_at,body`,{
            method:"GET",
            headers:{
                "apikey": env.SUPABASE_KEY,
                "Authorization":`Bearer ${env.SUPABASE_KEY}`
            }
        })

        const commentsData:IComment[] = await response.json()

        commentsData.forEach(comment => {comment.created_at = new Date(comment.created_at).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})})

        return commentsData
    }catch{
        return []
    }
}