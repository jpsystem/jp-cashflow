import { novoGrupoComSubgrupos, retGrupos } from "@/actions/grupoActions"
import NovoGrupoForm from "./_components/novoGrupoForm"
import TabelaGrupos from "./_components/tabelaGrupos"
import { tySubGrupo, tyGrupoLista } from "../../../types/types"

async function incluiGrupo() {
  "use server"

  // console.log("INCLUI GRUPO")
}

// async function incluiSubGrupo(){
//   'use server'
//   const dado = {
//     nome: "JPSystem",
//     descricao: "Entrada referente a JPSystem",
//     grupoId: 1,
//   }
//   const ret = await novoGrupoComSubgrupos(dado);
//   // console.log("INCLUI SUB GRUPO", ret)
// }

export default async function GrupoDeContas() {
  //const grupos:tyGrupoLista[] = await retGrupos();
  // console.log("AQUI!:", (grupos[0].qtdSubGrupos))
  return (
    <div className="flex flex-col min-h-[80vh] items-start gap-4 px-4 pb-4 md:justify-center md:px-6 md:gap-5">
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full justify-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
            Grupos de contas
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
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
