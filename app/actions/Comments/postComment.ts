"use server"

import { IComment } from "@/utils/types"

export const postComment = async (comment:IComment) => {
    try{
        const response = await fetch(`https://mybezvicayzlelthemaf.supabase.co/rest/v1/Comments`,{
            method:"POST",
            headers:{
                "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
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