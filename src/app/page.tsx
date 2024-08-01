import { getServerSession } from "next-auth"
import { auth as authOptions } from "@/lib/auth-config"
import { redirect } from "next/navigation"
import LoginForm from "./_components/loginForm"

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/home")
  }

  return (
    <div>
      <LoginForm />
    </div>
  )
}
