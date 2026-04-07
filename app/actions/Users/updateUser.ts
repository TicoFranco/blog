"use server"

import { Iuser,env } from "@/utils/types"
import { getUser } from "./getUser"
import bcrypt from "bcrypt";

export const updateUser = async (data:Iuser,newPassword:string = "") => {
    try{
        const user = await getUser(data)
        if(user){
            let encrypted
            if(newPassword){
              encrypted = await bcrypt.hash(newPassword,10)
            }
            const [responseUser,responsePost,responseComment] = await Promise.all([
                fetch(`${env.SUPABASE_URL}/Users?id=eq.${user.id}`,{
                  method:"PATCH",
                  headers:{
                    "apikey": env.SUPABASE_KEY,
                    "Authorization":`Bearer ${env.SUPABASE_KEY}`,
                    "Content-Type":"application/json"
                    },
                  body:JSON.stringify({
                    name:data.name,
                    avatar:data.avatar,
                    ...(newPassword && {password:encrypted})
                  })
                }),
                fetch(`${env.SUPABASE_URL}/Posts?user_id=eq.${user.id}`,{
                  method:"PATCH",
                  headers:{
                    "apikey": env.SUPABASE_KEY,
                    "Authorization":`Bearer ${env.SUPABASE_KEY}`,
                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                    username:data.name,
                    user_avatar:data.avatar
                  })
                }),
                fetch(`${env.SUPABASE_URL}/Comments?user_id=eq.${user.id}`,{
                  method:"PATCH",
                  headers:{
                    "apikey": env.SUPABASE_KEY,
                    "Authorization":`Bearer ${env.SUPABASE_KEY}`,
                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                    username:data.name,
                    user_avatar:data.avatar
                  })
                })
            ])

            if(responseUser.status === 204 && responsePost.status === 204 && responseComment.status === 204){
              return true
            }
        }
        return false
    }catch{
        return false
    }
}