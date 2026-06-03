import { Dispatch, SetStateAction } from "react"

export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!
}

export interface Iuser{
    id:string,
    name:string,
    email:string,
    password:string,
    avatarUrl:string,
    createdAt:string,
    updatedAt:string
}

export interface IPost{
    id:string,
    title:string,
    description:string,
    body:string,
    updatedAt:string,
    author:{id:string,name:string,avatarUrl:string},
    comments:IComment[]
}

export interface IComment{
    id:string,
    body:string,
    updatedAt:string,
    user:{id:string,name:string,avatarUrl:string}
}

export interface IResultModal{
  state:boolean
  result:string
  setState:Dispatch<SetStateAction<boolean>>
  setResult:Dispatch<SetStateAction<string>>
  sucessText:string
  failureText:string
}

export interface IUserSettingsInputModal{
  state:boolean
  setState:Dispatch<SetStateAction<boolean>>
  attribute:string
  user:Partial<Iuser>
  onSubmitForm: (data:formDataUserSettings) => void
}

export type formDataUserSettings = {
  name:string,
  oldPassword:string,
  password:string,
  avatar:string
}