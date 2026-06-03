import { env } from "@/utils/types"

export const logoutUser = async () => {
    try{
        const request = await fetch(`${env.API_URL}/user/logout`,{
            method:"POST",
            credentials:"include"
        })

        const response = await request.json()

        if(!request.ok){
            return {error:response.message}
        }

        return {success:true}
    }catch{
        return {error:'server error'}
    }
}