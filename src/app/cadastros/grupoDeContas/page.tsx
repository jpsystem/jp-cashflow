'use client'

import { useEffect, useState } from "react"
import NovoGrupoForm from "./_components/novoGrupoForm"
import TabelaGrupos from "./_components/tabelaGrupos"
import { tyGrupoLista } from "@/types/types"
import { retGrupos } from "@/actions/grupoActions"



export default function GrupoDeContas() {
  //const grupos:tyGrupoLista[] = await retGrupos();
  // console.log("AQUI!:", (grupos[0].qtdSubGrupos))

  const [atualisaGrupos, setAtualizaGrupos] = useState(true)
  const[dados, setDados]  = useState<tyGrupoLista[]>([]);

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const result = await retGrupos();
        setDados(result);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    if(atualisaGrupos){
      fetchData();
      setAtualizaGrupos(false);
    }
  },[atualisaGrupos])

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
          <NovoGrupoForm setAtualizaGrupos={setAtualizaGrupos}/>
        </div>
      </div>
      <TabelaGrupos dados={dados}/>
    </div>
  )
}
