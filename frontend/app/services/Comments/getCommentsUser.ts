import { IComment,env } from "@/utils/types"

export const getCommentsUser = async () => {
    try{
        const request = await fetch(`${env.API_URL}/user/comments`,{
            method:"GET",
            credentials:"include"
        })

        const commentsData:IComment[] = await request.json()

        commentsData.forEach(comment => {comment.updatedAt = new Date(comment.updatedAt).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})})

        return commentsData
    }catch{
        return []
    }
}