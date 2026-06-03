import { prisma } from "../lib/prisma.js";

export interface userProps{
    email:string,
    name:string,
    password:string,
    avatarUrl:string
}

export class UserServices{
    async findUsers(){
        return await prisma.user.findMany({select:{email:true,name:true}})
    }

    async findUserByEmail(email:string){
        return await prisma.user.findUnique({where:{email:`${email}`}}) 
    }

    async createUser(data:userProps){
        return await prisma.user.create({data:{
            email:data.email,
            name:data.name,
            password:data.password,
            avatarUrl:data.avatarUrl
        }})
    }

    async updateUser(data:userProps){
        return await prisma.user.update({
            where:{email:`${data.email}`},
            data:{
                name:data.name,
                password:data.password,
                avatarUrl:data.avatarUrl
            }
        })
    }

    async deleteUser(email:string){
        return await prisma.user.delete({where:{email:`${email}`}})
    }
}