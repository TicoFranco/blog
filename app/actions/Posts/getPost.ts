"use server"

import { IPost } from "@/utils/types"

export const getPost = async (post_id:string) => {
    try{
        const response = await fetch(`https://mybezvicayzlelthemaf.supabase.co/rest/v1/Posts?id=eq.${post_id}&select=*`,{
            method:"GET",
            headers:{
                "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM"
            }
        })

        if(!response.ok){
            console.log("erro no fetch")
            return null
        }

        const postData:IPost[] = await response.json()
        const post = postData[0]

        if(!post){
            console.log("post nao encontrado")
            return null
        }

        post.created_at= new Date(post.created_at).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})

        return post
    }catch{
        return null
    }
}