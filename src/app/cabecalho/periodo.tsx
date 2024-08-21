'use client'

import { useGlobalContext } from "../contextGlobal"
import { VerificaPeriodo } from "@/actions/orcamentoActions";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import queryClient from "@/lib/reactQuery";
import {useSession } from "next-auth/react"

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

export default function Periodo() {

  const { data: session } = useSession();

  const { usuarioId, setPeriodo, periodoId, setPeriodoId} = useGlobalContext();
  
  const onChange = async (value: string) =>{
    const resultado = await VerificaPeriodo(usuarioId, value);
    if(resultado.status === "Sucesso"){
      setPeriodoId(resultado.regId);
      setPeriodo(value);
    }
    return true
  }

  return(
    <div className="flex flex-row justify-center align-middle">
      <div className="flex mr-2 align-middle">
        <Label className="block h-[40px] font-bold text-xl text-sky-50">
            Período Ativo
        </Label>
      </div>
      <div className="flex ">
        <Select defaultValue={""} onValueChange={onChange}>
          <SelectTrigger className="w-[250px] h-[40px] text-xl">
            <SelectValue placeholder="Selecione o periodo" />
          </SelectTrigger>
          <SelectContent className="h-[200px] opacity-100 border-2 border-sky-950 bg-sky-100 text-sky-900">
            <SelectGroup className="hover:bg-sky-900 hover:text-sky-100">
              { obterMesAno().map((mesAno, index) => (
                <SelectItem className="bg-sky-100  text-sky-900"  key={index} value={mesAno}>{mesAno}</SelectItem>
                ))
              }                  
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div> 
  )

}