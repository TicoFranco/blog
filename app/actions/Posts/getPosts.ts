"use server"

import { IPost,env } from "@/utils/types"

export const getPosts = async () => {
    try{
        const response = await fetch(`${env.SUPABASE_URL}/Posts?select=id,title,description,created_at`,{
            method:"GET",
            headers:{
               "apikey": env.SUPABASE_KEY,
               "Authorization":`Bearer ${env.SUPABASE_KEY}`
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