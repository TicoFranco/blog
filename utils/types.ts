import { Dispatch, SetStateAction } from "react";

export type ICreatePost = {
    title:string
    description:string
    body:string
    user_id:string
}

export type IUser = {
  id:string
  name:string
  email: string
  password:string
  avatar:string
}

export type postUserCreator ={
  name:string
  avatar:string
}

export type headerUser = {
  id:string
  name:string
  email:string
  avatar:string
}

export type IPost = {
    id:string
    title:string
    description:string
    body:string
    created_at:string
    user_id:string
}

export interface IPostCard{
    id:string
    created_at:string
    title:string
    description:string
}

export interface IModal{
  state:boolean
  result:string
  setState:Dispatch<SetStateAction<boolean>>
  setResult:Dispatch<SetStateAction<string>>
  sucessText:string
  failureText:string
}

export type FormDataLogin = {
  email: string
  password: string
}

export type FormDataSignUp = {
  name:string
  email: string
  password: string
  avatar:string
}
 