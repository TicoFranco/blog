import { env, IComment } from "@/utils/types"

export const updateComment = async (comment:IComment) => {
    try{
        const request = await fetch(`${env.API_URL}/user/comments`,{
            method:"PUT",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:comment.id,
                body:comment.body
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