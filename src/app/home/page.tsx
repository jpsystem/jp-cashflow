import { getServerSession } from "next-auth"
import { auth as authOptions } from "@/lib/auth-config"

import { redirect } from "next/navigation"
import LogoutButton from "../_components/logoutButton"

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }
  return (
    <div>
      <h1>Página Home</h1>
      <h1>Bem vindo, {session?.user?.email}</h1>

      <LogoutButton text="Sair" />
    </div>
  )
}
