import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function layout({children}:{children:React.ReactNode}) {
  const token = (await cookies()).get("token")

  if(token){
    redirect('/')
  }
  
  return (
    <main>
        {children}
    </main>
  )
}