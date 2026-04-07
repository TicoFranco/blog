"use server"

import { IPost,env } from "@/utils/types"

export const getPost = async (post_id:string) => {
    try{
        const response = await fetch(`${env.SUPABASE_URL}/Posts?id=eq.${post_id}&select=*`,{
            method:"GET",
            headers:{
               "apikey": env.SUPABASE_KEY,
               "Authorization":`Bearer ${env.SUPABASE_KEY}`
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