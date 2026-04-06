"use server"

import { IComment } from "@/utils/types"

export const getCommentsPost = async (post_id:string) => {
    try{
        const response = await fetch(`https://mybezvicayzlelthemaf.supabase.co/rest/v1/Comments?post_id=eq.${post_id}&select=username,user_avatar,created_at,body`,{
            method:"GET",
            headers:{
                "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM"
            }
        })

        const commentsData:IComment[] = await response.json()

        commentsData.forEach(comment => {comment.created_at = new Date(comment.created_at).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})})

        return commentsData
    }catch{
        return []
    }
}