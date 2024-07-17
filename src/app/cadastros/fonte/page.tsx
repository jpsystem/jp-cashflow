'use client'

import { useEffect, useState } from "react"
import NovoFonteForm from "./_components/novoFonteForm"
import TabelaFonte from "./_components/tabelaFontes"
import { tyFonte } from "@/types/types"
import { ListaFontes } from "@/actions/fonteActions"

//==============================
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import queryClient from "@/lib/reactQuery"

export default function Fontes() {
  
  //const [atualisaFontes, setAtualizaFontes] = useState(true)
  const[dados, setDados]  = useState<tyFonte[]>([]);

  const fetchData = async (): Promise<tyFonte[]> => {
        // try {
          const result = await ListaFontes();
          return result.fonte
          //setDados(result.fonte);
        // } catch (error) {
        //   console.error('Erro ao buscar dados:', error);
        // }
      };
 
  const queryClient = useQueryClient();
  //const { data, error, isLoading } = useQuery<tyFonte[]>( [],fetchData);
  //const mutation = useMutation(addFonte, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['fontes']);
  //   },
  // });



  // useEffect(() =>{
  //   const fetchData = async () => {
  //     try {
  //       const result = await ListaFontes();
  //       setDados(result.fonte);
  //     } catch (error) {
  //       console.error('Erro ao buscar dados:', error);
  //     }
  //   };
  //   if(atualisaFontes){
  //     fetchData();
  //     setAtualizaFontes(false);
  //   }
  // },[atualisaFontes])

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
      <TabelaFonte data={dados} />
      {/* <form action={incluiFonte}>
        <button type="submit"></button>
      </form> */}
    </div>
  )
}
