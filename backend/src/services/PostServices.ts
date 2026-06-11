import { prisma } from "../lib/prisma.js";

interface createPostProps{
    title:string,
    description:string,
    body:string,
    authorId:string
}

interface updatePostProps{
    id:string,
    authorId:string,
    title:string,
    description:string,
    body:string
}

interface deletePostProps{
    id:string,
    authorId:string
}


export class PostServices{
    async findAllPosts(){
        return await prisma.post.findMany({select:{id:true,title:true,description:true,updatedAt:true}})
    }

    async findAllPostsByUser(authorId:string){
        return await prisma.post.findMany({where:{authorId:authorId},select:{id:true,title:true,description:true,updatedAt:true}})
    }

    async findPostById(id:string){
        return await prisma.post.findUnique({where:{id:id},select:{
            id:true,title:true,description:true,body:true,updatedAt:true,
            author:{select:{id:true,name:true,avatarUrl:true}},
            comments:{select:{id:true,body:true,updatedAt:true,user:{select:{id:true,name:true,avatarUrl:true}}}}
        }})
    }

    async createPost(data:createPostProps){
        return await prisma.post.create({data:{
            title:data.title,
            description:data.description,
            body:data.body,
            authorId:data.authorId
        }})
    }

    async updatePost(data:updatePostProps){
        return await prisma.post.update({
            where:{id:data.id,authorId:data.authorId},
            data:{
                title:data.title,
                description:data.description,
                body:data.body
            }
        })
    }

    async deletePost(data:deletePostProps){
        return await prisma.post.delete({where:{id:data.id,authorId:data.authorId}})
    }
}