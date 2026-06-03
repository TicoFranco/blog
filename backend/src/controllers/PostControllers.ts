import type { FastifyRequest,FastifyReply } from "fastify";
import { PostServices } from "../services/PostServices.js";
import { prismaExceptionHandler } from "../utils/prismaExceptionHandler.js";
import { createPostSchema } from "../schemas/post-schemas/create-post-schema.js";
import { updatePostSchema } from "../schemas/post-schemas/update-post-schema.js";
import {z} from 'zod'

const postServices = new PostServices()

export class PostControllers{
    async findAllPosts(request:FastifyRequest,reply:FastifyReply){
        try{
            const posts = await postServices.findAllPosts()
            return reply.status(200).send(posts)
        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'posts')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async findPostById(request:FastifyRequest,reply:FastifyReply){
        try{
            const {postId} = request.params as {postId:string}
            const post = await postServices.findPostById(postId)

            if(!post){
                return reply.status(404).send("post not found")
            }

            return reply.status(200).send(post)

        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'posts')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async findAllPostsByUser(request:FastifyRequest,reply:FastifyReply){
        try{
            const authorId = request.user.id
            const posts = await postServices.findAllPostsByUser(authorId)
            if(!posts){
                return reply.status(404).send({message:"user not found."})
            }

            return reply.status(200).send(posts)
        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'posts')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async createPost(request:FastifyRequest,reply:FastifyReply){
        try{
            const authorId = request.user.id
            const {title,description,body} = request.body as {title:string,description:string,body:string}
            const parsedData = createPostSchema.safeParse({title,description,body})

            if(!parsedData.success){
                return reply.status(422).send({titleErrors:z.treeifyError(parsedData.error).properties?.title,
                    descriptionErrors:z.treeifyError(parsedData.error).properties?.description,
                    bodyErrors:z.treeifyError(parsedData.error).properties?.body
                })
            }

            await postServices.createPost({title:title,description:description,body:body,authorId:authorId})
            return reply.status(201).send({message:"post created"})

        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'post')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async updatePost(request:FastifyRequest,reply:FastifyReply){
        try{
            const authorId = request.user.id
            const {id,title,description,body} = request.body as {id:string,title:string,description:string,body:string}
            const parsedData = updatePostSchema.safeParse({id,title,description,body})

            if(!parsedData.success){
                return reply.status(422).send({idErrors:z.treeifyError(parsedData.error).properties?.id,
                    titleErrors:z.treeifyError(parsedData.error).properties?.title,
                    descriptionErrors:z.treeifyError(parsedData.error).properties?.description,
                    bodyErrors:z.treeifyError(parsedData.error).properties?.body
                })
            }

            await postServices.updatePost({id:id,authorId:authorId,title:title,description:description,body:body})
            return reply.status(200).send({message:"post updated"})

        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'post')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async deletePost(request:FastifyRequest,reply:FastifyReply){
        try{
            const authorId = request.user.id
            const {id} = request.body as {id:string}
            await postServices.deletePost({id:id,authorId:authorId})
            return reply.status(200).send({message:"post deleted"})
        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'post')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }
}