import { IPost,env } from "@/utils/types"

export const getPosts = async () => {
    try{
        const request = await fetch(`${env.API_URL}/posts`,{method:"GET"})

        const postsData:IPost[] = await request.json()

        if(!request.ok){
            return []
        }

        postsData.forEach(post => {
            post.updatedAt = new Date(post.updatedAt).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})
        });

        return postsData
    }catch{
        return []
    }
}