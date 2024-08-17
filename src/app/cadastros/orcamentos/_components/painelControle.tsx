"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQuery} from 'react-query';
import queryClient from "@/lib/reactQuery";
import { CriarOrcamentos, RetOrcamento, VerificaPeriodo } from "@/actions/orcamentoActions";
import { tyOrcamento, tyResult } from "@/types/types";
import { useAppContext } from "./contextProvider";
import TabelaOrcamento from "./tabelaOrcamento";

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];

function obterMesAno() {
  const anoAtual = new Date().getFullYear();
  const mesAno = [];
  for (let ano = anoAtual; ano <= anoAtual + 5; ano++) {
    for (let mes = 0; mes < meses.length; mes++) {
      mesAno.push(`${meses[mes]}/${ano}`);
    }
  }
  return mesAno;
};

export default function PainelControle (){
  const { usuarioId, periodoId, setPeriodoId, dados, setDados} = useAppContext();

  //Carrega os Orcamentos
  const { data, isLoading, refetch } = useQuery( ["orcamentos", periodoId], async () => {
    const response:tyOrcamento[] = await RetOrcamento(periodoId);
    setDados(response);
    //console.log("Response: ", response);
    return response;
  })


  const onChange = async (value: string) =>{
    const resultado = await VerificaPeriodo(usuarioId, value);
    if(resultado.status === "Sucesso"){
      setPeriodoId(resultado.regId);
      //Limpar o cache da consulta para atualizar os dados
      queryClient.refetchQueries(["orcamentos", periodoId]);
    }

    return true
  }

  const incluirOrcamentos = async () =>{
    let retorno:tyResult ;
    try {
      retorno = await CriarOrcamentos(periodoId, usuarioId);
       //Limpar o cache da consulta para atualizar os dados
       queryClient.refetchQueries(["orcamentos", periodoId]);   
    } catch (error) {
      
    }
  }

  return(
    <div className="pb-8 flex flex-col w-full items-center">
      <Card className="border-sky-900 border-2 w-[70%]">
        <CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3">
          <div className="flex flex-col">
            <Label className="block text-sm font-medium text-sky-900 ">
              Período
            </Label>
            <Select defaultValue={""} onValueChange={onChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione o periodo" />
                </SelectTrigger>
              <SelectContent className="h-[200px] opacity-100 border-2 border-sky-950 bg-sky-100 text-sky-900">
                <SelectGroup className="hover:bg-sky-900 hover:text-sky-100">
                  { obterMesAno().map((mesAno, index) => (
                    <SelectItem className="bg-sky-100  text-sky-900"  key={index} value={mesAno}>{mesAno}</SelectItem>
                    ))
                  }                  
                </SelectGroup>
                {/* <SelectGroup></SelectGroup> */}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-1 gap-4 justify-end">
            <div className="flex flex-col w-[30%] max-w-xs">
              <Button
                variant="outline" disabled={!(data?.length === 0 && periodoId > 0)}
                className="border-2 border-sky-900 text-sm"
                onClick={incluirOrcamentos}
              >Criar Orçamentos</Button>
            </div>
            <div className="flex flex-col w-[30%] max-w-xs">
              <Button
                variant="outline" disabled={!(data?.length !== 0 && periodoId > 0)}
                className="border-2 border-sky-900 text-sm"
              >Atualizar Orçamentos</Button>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}