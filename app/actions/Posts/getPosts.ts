"use server"

import { IPost } from "@/utils/types"

export const getPosts = async () => {
    try{
        const response = await fetch(`https://mybezvicayzlelthemaf.supabase.co/rest/v1/Posts?select=id,title,description,created_at`,{
            method:"GET",
            headers:{
                "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM"
            }
        })

        if(!response.ok){
            return []
        }

        const postsData:IPost[] = await response.json()

        postsData.forEach(post => {
            post.created_at = new Date(post.created_at).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})
        });

        return postsData
    }catch{
        return []
    }
}