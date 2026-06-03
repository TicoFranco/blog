import type { FastifyRequest,FastifyReply } from "fastify";
import { UserServices } from "../services/UserServices.js";
import { createUserSchema } from "../schemas/user-schemas/create-user-schema.js";
import { updateUserSchema } from "../schemas/user-schemas/update-user-schema.js";
import { loginSchema } from "../schemas/user-schemas/login-schema.js";
import { deleteUserSchema } from "../schemas/user-schemas/delete-user-schema.js";
import {z} from 'zod'
import { prismaExceptionHandler } from "../utils/prismaExceptionHandler.js";
import bcrypt from 'bcrypt'

const userServices = new UserServices()

export class UserControllers{
    async findUsers(request:FastifyRequest,reply:FastifyReply){
        try{
            const users = await userServices.findUsers()
            return reply.status(200).send(users)
        }catch(err){
           const prismaErr = prismaExceptionHandler(err,'users')
           return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async findCookieUser(request:FastifyRequest,reply:FastifyReply){
        try{
            const email = request.user.email
            const user = await userServices.findUserByEmail(email)

            if(!user){
               return reply.status(404).send({message:"user not found."})
            }

            return reply.status(200).send({id:user.id,email:user.email,name:user.name,avatarUrl:user.avatarUrl}) 
        }catch(err){
           const prismaErr = prismaExceptionHandler(err,'user')
           return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async createUser(request:FastifyRequest,reply:FastifyReply){
        try{
            const {email,name,password,avatarUrl} = request.body as {email:string,name:string,password:string,avatarUrl:string}
            const parsedData = createUserSchema.safeParse({email,name,password,avatarUrl})

            if(!parsedData.success){
               return reply.status(422).send({nameErrors:z.treeifyError(parsedData.error).properties?.name,
                emailErrors:z.treeifyError(parsedData.error).properties?.email,
                passwordErrors:z.treeifyError(parsedData.error).properties?.password,
                avatarErrors:z.treeifyError(parsedData.error).properties?.avatarUrl
               })
            }

            const hashedPassword = await bcrypt.hash(password,10)
            
            await userServices.createUser({email:email,name:name,password:hashedPassword,avatarUrl:avatarUrl})
            return reply.status(201).send({message:'user created'})

        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'user')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async login(request:FastifyRequest,reply:FastifyReply){
        const {email,password} = request.body as {email:string,password:string}
        const parsedData = loginSchema.safeParse({email,password})

        if(!parsedData.success){
            return reply.status(422).send({emailErrors:z.treeifyError(parsedData.error).properties?.email?.errors,
                passwordErrors:z.treeifyError(parsedData.error).properties?.password?.errors})
        }

        const user = await userServices.findUserByEmail(email)

        if(!user){
            return reply.status(401).send({message:"email or password is incorrect."})
        }

        const comparePasswords = await bcrypt.compare(password,user.password)

        if(!comparePasswords){
            return reply.status(401).send({message:'email or password is incorrect.'})
        }

        const token = await reply.jwtSign({id:user.id,email:user.email},{sign:{expiresIn:'1h'}})

        return reply.setCookie('token',token,{httpOnly:true,sameSite:'lax',secure:false,path:'/',maxAge:60*60})
           .status(200).send({id:user.id,email:user.email,name:user.name,avatarUrl:user.avatarUrl})
    }

    async updateUser(request:FastifyRequest,reply:FastifyReply){
        try{
            const email = request.user.email
            const {name,password,newPassword,avatarUrl} = request.body as {name:string,password:string,newPassword:string,avatarUrl:string}
            const parsedData = updateUserSchema.safeParse({name,password,newPassword,avatarUrl})

            if(!parsedData.success){
                return reply.status(422).send({nameErrors:z.treeifyError(parsedData.error).properties?.name,
                passwordErrors:z.treeifyError(parsedData.error).properties?.password,
                avatarErrors:z.treeifyError(parsedData.error).properties?.avatarUrl,
                newPasswordErrors:z.treeifyError(parsedData.error).properties?.newPassword
            })
            }

            const user = await userServices.findUserByEmail(email)

            if(!user){
                return reply.status(404).send({message:"user not found"})
            }

            const comparePasswords = await bcrypt.compare(password,user.password)

            if(!comparePasswords){
                return reply.status(401).send({message:'invalid data'})
            }
            
            let hashedPassword

            if(newPassword){
                hashedPassword = await bcrypt.hash(newPassword,10)
            }else{
                hashedPassword = await bcrypt.hash(password,10)
            }
            await userServices.updateUser({email:email,name:name,password:hashedPassword,avatarUrl:avatarUrl})
            return reply.status(200).send({message:'user updated'})
        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'user')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async deleteUser(request:FastifyRequest,reply:FastifyReply){
        try{
            const email = request.user.email
            const {password} = request.body as {password:string}
            const parsedData = deleteUserSchema.safeParse({password})

            if(!parsedData.success){
              return reply.status(422).send({passwordErrors:z.treeifyError(parsedData.error).properties?.password})
            }

            const user = await userServices.findUserByEmail(email)

            if(!user){
                return reply.status(404).send({message:"user not found"})
            }

            const comparePasswords = await bcrypt.compare(password,user.password)

            if(!comparePasswords){
                return reply.status(401).send({message:'invalid data'})
            }

            await userServices.deleteUser(email)
            return reply.status(200).send({message:'user deleted'})

        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'user')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async logout(request:FastifyRequest,reply:FastifyReply){
        return reply.clearCookie('token',{httpOnly:true,sameSite:'lax',secure:false,path:'/',maxAge:60*60})
        .status(200).send({message:"logout successful"})
    }

    async checkCookie(request:FastifyRequest,reply:FastifyReply){
        const cookie = request.cookies.token

        console.log(request.cookies)

        if(!cookie){
            return reply.status(404).send({error:'cookie not found'})
        }

        return reply.status(200).send({message:'cookie found'})
    }
}
