import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "../_components/logoutButton";

export default async function Page(){
  const session = await getServerSession();

  if(!session) {
    redirect("/")
  }
  return(
    <div>
      <h1>Página Dashboard</h1>
      <h1>Bem vindo, {session?.user?.name}</h1>
      <LogoutButton text="Sair"/>
    </div>
  )

}