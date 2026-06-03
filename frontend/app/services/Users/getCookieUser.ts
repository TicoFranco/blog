import { env } from "@/utils/types"

export const getCookieUser = async () => {
    try{
        const request = await fetch(`${env.API_URL}/user`,{
            method:"GET",
            credentials:"include"
        })

        const response = await request.json()

        if(!request.ok){
            return {error:response.message}
        }

        return response
    }catch{
        return {error:'server error'}
    }
}