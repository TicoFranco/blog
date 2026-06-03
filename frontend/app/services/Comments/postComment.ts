import { env } from "@/utils/types"

export const postComment = async (postId:string,body:string) => {
    try{
        const request = await fetch(`${env.API_URL}/post/comments`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:postId,
                body:body
            })
        })

        const response = await request.json()

        if(request.status !== 201){
            return {error:response.message}
        }
        
        return {success:true}
    }catch{
        return {error:'server error'}
    }
}