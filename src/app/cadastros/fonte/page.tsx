import NovoFonteForm from "./_components/novoFonteForm"
import TabelaFonte from "./_components/tabelaFontes"

//import queryClient from "@/lib/reactQuery";


export default async function Fontes() {
  
  //const data = await ListaFontes();

  return (
    
    <div className="flex flex-col min-h-[80vh] items-start gap-4 px-4 pb-4 md:justify-center md:px-6 md:gap-5">
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full justify-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
            Fontes
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
            Gerenciar suas contas financeiras
          </p>
        </div>
        <div className="flex w-full justify-end">
          <NovoFonteForm />
        </div>
      </div>
      <TabelaFonte />
    </div>
    
  )
  
}
