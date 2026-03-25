"use server"

import {IUser} from "@/utils/types";

export const getUserById = async (id:string) => {
    try{
        const response = await fetch(`https://mybezvicayzlelthemaf.supabase.co/rest/v1/Users?id=eq.${id}&select=*&limit=1`,{
            method:"GET",
            headers:{
                "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM"
            }})


        if(!response.ok){
            console.log("erro no fetch")
            return null
        }

        const userData:IUser[] = await response.json()

        const user = userData[0]

        if(!user){
            console.log("usuario nao encontrado")
            return null
        }

        return {
            name:user.name,
            avatar:user.avatar
        }
    }catch{
        return null
    }
}