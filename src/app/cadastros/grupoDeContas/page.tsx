import NovoGrupoForm from "./_components/novoGrupoForm"
import TabelaGrupos from "./_components/tabelaGrupos"


export default function GrupoDeContas() {
  
  return (
    
    <div className="flex flex-col min-h-[80vh] items-start gap-4 px-4 pb-4 md:justify-center md:px-6 md:gap-5">
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full justify-center">
          <h1 className="text-sky-900 text-2xl font-bold tracking-tighter text-center">
            Grupos de contas
          </h1>
          <p className="text-sky-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
            Gerenciar o plano de contas para o controle financeiro
          </p>
        </div>
        <div className="flex w-full justify-end">
          <NovoGrupoForm />
        </div>
      </div>
      <TabelaGrupos />
    </div>
  )
}
