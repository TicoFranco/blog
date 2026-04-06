"use server"

import { Iuser } from "@/utils/types"
import { getUser } from "./getUser"

export const updateUser = async (data:Iuser,newPassword:string = "") => {
    try{
        const user = await getUser(data)
        if(user){
            const emailEncoded = encodeURIComponent(data.email)
            const responseUser = await fetch(`https://mybezvicayzlelthemaf.supabase.co/rest/v1/Users?id=eq.${emailEncoded}&select=name,avatar,password&limit=1`,{
               method:"PATCH",
               headers:{
                  "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                  "Content-Type":"application/json"
                },
               body:JSON.stringify({
                  name:data.name,
                  avatar:data.avatar,
                  password:newPassword !== "" ? newPassword : data.password
                })
            })

            const responsePost = await fetch(`https://mybezvicayzlelthemaf.supabase.co/rest/v1/Posts?user_id=eq.${user.id}&select=username,user_avatar&limit=1`,{
               method:"PATCH",
               headers:{
                  "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                  "Content-Type":"application/json"
                },
               body:JSON.stringify({
                  username:data.name,
                  avatar:data.avatar
                })
            })

            const responseComment = await fetch(`https://mybezvicayzlelthemaf.supabase.co/rest/v1/Comments?user_id=eq.${user.id}&select=username,user_avatar&limit=1`,{
               method:"PATCH",
               headers:{
                  "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                  "Content-Type":"application/json"
                },
               body:JSON.stringify({
                  username:data.name,
                  avatar:data.avatar
                })
            })

            if(responseUser.ok && responsePost.ok && responseComment.ok){
                return true
            }
        }
        return false
    }catch{
        return false
    }
}

//export const updateUser = async (email:string,data:formDataUserSettings)