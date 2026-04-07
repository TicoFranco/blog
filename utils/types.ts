import { Dispatch, SetStateAction } from "react"

export const env = {
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_KEY: process.env.SUPABASE_KEY!
}

export interface Iuser{
    id:string,
    name:string,
    email:string,
    password:string,
    avatar:string,
    created_at:string
}

export interface IPost{
    id:string,
    created_at:string,
    title:string,
    description:string,
    body:string,
    user_id:string,
    username:string,
    user_avatar:string
}

export interface IComment{
    id:string,
    created_at:string,
    username:string,
    user_avatar:string,
    user_id:string,
    post_id:string,
    body:string
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