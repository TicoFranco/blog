import { env } from "@/utils/types"

export const deletePost = async (post_id:string) => {
    try{
        const request = await fetch(`${env.API_URL}/post`,{
            method:"DELETE",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:post_id
            })
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