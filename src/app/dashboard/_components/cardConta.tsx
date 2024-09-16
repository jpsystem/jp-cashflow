"use client"

import { RetSomatoriasPeriodo } from "@/actions/graficosActions";
import { useGlobalContext } from "@/app/contextGlobal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { tySomatoriasPeriodo } from "@/types/types";
import { useEffect, useState } from "react";
import { LuCalendarDays, LuInfo } from "react-icons/lu";
import { useDashboardContext } from "./contextDashboardProvider";

interface CardContaProps {
  icone: string;
  conta: string;
}

export default function CardConta({ icone, conta }: CardContaProps) {
  const [dadosMovimento, setDadosMovimento] = useState<tySomatoriasPeriodo[]>([]);

  const {periodoId} = useGlobalContext();
  const { dadosBarDespesas, dadosPizzaEntradas } = useDashboardContext();

  useEffect(() => {
    async function carregaMovimentos(){
      const response = await RetSomatoriasPeriodo(periodoId);
      setDadosMovimento(response);
    }

    carregaMovimentos();

  }, [ periodoId]);

  let valor = "";
  if(conta === "Despesas"){
    valor = saldoDespesas();
  }
  if(conta === "Receitas"){
    valor = saldoReceitas();
  }
  if(conta === "Cartões de crédito"){
    valor=saldoContas("C");
  }
  if(conta === "Saldo disponível"){
    valor=saldoContas("M")
  }
  if(conta === "Investimentos"){
    valor=saldoContas("A")
  }

    /**
   * Função que soma todas as contas de um determinado tipo 
   * (Entrada ou Saída) e retorna o valor formatado em moeda
   * @param tipo Tipo das contas ("M-Movimento" ou "A-Aplicação" ou "C-Crédito")
   * @returns Somatória dos saldos atualizado das contas formatado em moeda
   */
  function saldoContas(tipo: String) {
    const somaContas = dadosMovimento
      .filter((movimento) => movimento.Tipo === tipo)
      .reduce((soma, movimento) => soma + movimento.saldoAtual, 0);
      const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    
      return formatoMoeda.format(somaContas);
  }
  
  function saldoDespesas() {
    const somaDespesas = dadosBarDespesas
      .reduce((soma, despesa) => soma + despesa.valorReal, 0);
      const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    
      return formatoMoeda.format(somaDespesas);
  }

  function saldoReceitas() {
    const somaEntradas = dadosPizzaEntradas
      .reduce((soma, entrada) => soma + entrada.valorReal, 0);
      const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    
      return formatoMoeda.format(somaEntradas);
  }

  return (
    <>
      <div className="flex justify-between space-x-6 text-sky-800">
        <Avatar>
          <AvatarImage src={"/" + icone} />
          <AvatarFallback>
            <LuInfo />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-0">
          <h1 className="text-sm font-semibold text-sky-900">{conta}</h1>
          <h1 className="text-lg font-bold text-sky-800">
            {valor}
          </h1>
          <div className="flex items-center pt-2 ">
            <LuCalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground opacity-70 text-sky-800 ">
              ver detalhes...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
