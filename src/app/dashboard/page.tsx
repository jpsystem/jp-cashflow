"use client";

import { useEffect, useState } from "react";
import BarChart from "./_components/barChar";
import BarChartR from "./_components/barCharReceita";
import CardConta from "./_components/cardConta";
import { useRouter } from 'next/navigation';
import {useSession } from "next-auth/react";
import { useGlobalContext } from "../contextGlobal";
import { VerificaPeriodo } from "@/actions/orcamentoActions";
import { retPeriodoAtual } from "@/lib/formatacoes";
import GraficoBarDespesas from "./_components/graficoBarDespesas";
import { RetEstatisticaDespesas } from "@/actions/graficosActions";
import { useQuery } from "react-query";

// const despesas = [
//   { conta: "Alimentação", valor: 1200.0 },
//   { conta: "Transporte", valor: 2800.0 },
//   { conta: "Saude", valor: 530.0 },
//   { conta: "Lazer", valor: 830.0 },
//   { conta: "Habitação", valor: 870.0 },
//   { conta: "Educação", valor: 1200.0 },
// ];

// const despesas2 = [
//   { conta: "Alimentação", valorReal: 1500.00, valorOrcado: 1200.00 },
//   { conta: "Transporte", valorReal: 2500.00, valorOrcado: 2800.00 },
//   { conta: "Saude", valorReal: 800.00, valorOrcado: 530.00 },
//   { conta: "Lazer", valorReal: 1000.00, valorOrcado: 830.00 },
//   { conta: "Habitação", valorReal: 1300.00, valorOrcado: 870.00 },
//   { conta: "Educação", valorReal: 1500.00, valorOrcado: 1200.00 },
// ];

type Despesa = {
  GrupoID: number;
  Grupo: string;
  valorReal: number;
  valorOrcado: number;
}

const receitas = [
  { conta: "Salário", valor: 2500.0 },
  { conta: "Freelance", valor: 600.0 },
  { conta: "Investimentos", valor: 300.0 },
  { conta: "Outras Receitas", valor: 200.0 },
];

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

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  //Coloca o id di usuário no contexto
  const { usuarioId, periodoId, setPeriodoId} = useGlobalContext();
  
  const [mostrarDespesas, setMostrarDespesas] = useState<boolean>(true);
  const [periodo, setPeriodo ] = useState<string>(retPeriodoAtual());
  const [despesas, setDespesas ] = useState<Despesa[]>([]);

  const toggleDespesas = () => setMostrarDespesas(true);
  const toggleReceitas = () => setMostrarDespesas(false);

  useEffect(() => {
    // Coloque a lógica de atualização de estado aqui
    if (!session) {
      router.push('/'); // Redireciona para a página inicial se não houver sessão
    }
  });
  

  //Carrega as Despesas para o grafico
  const { data, isLoading, refetch } = useQuery( ["despesas", periodoId], async () => {
    const response = await RetEstatisticaDespesas(periodoId);
    setDespesas(response);
    return response;
  })

  const onChange = async (value: string) =>{
    const resultado = await VerificaPeriodo(usuarioId, value);
    if(resultado.status === "Sucesso"){
      setPeriodoId(resultado.regId);
      // //Limpar o cache da consulta para atualizar os dados
      // queryClient.refetchQueries(["orcamentos", periodoIdG]);
    }

    return true
  }

  console.log(despesas);

  return (
    // Contener
    <div className="flex flex-row  h-[60%] w-[80%] max-h-[600px] max-w-[1000px] min-w-[600px]  min-h-[200px] items-center px-4 py-0 pb-16">
      <div className="flex flex-col justify-between h-full w-full  m-4 py-0">
        {/* Titulo da Página */}
        <div className="flex flex-col w-full mb-6 justify-center">
          <h1 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-2xl text-center text-sky-900 py-0">
            Dashboard
          </h1>
          <p className="text-sm md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-sky-800 text-center">
            Painel de estatísticas do período.
          </p>
        </div>
        {/* Definir periodo ativo */}

        {/* Conteudo */}
        <div className="flex flex-row align-middle">
          {/* Lado Esquerdo */}
          <div className="flex flex-col justify-center align-middle  w-5/6 mr-6">
            {/* Linha 1 */}
            <div className="flex flex-col justify-center mb-10">
              {/* Grafico */}
              <div className="flex justify-start items-center mb-4 w-full">
                <label className="flex items-center mr-2 md:mr-4 text-sky-900">
                  <input
                    type="checkbox"
                    checked={mostrarDespesas}
                    onChange={toggleDespesas}
                    className="mr-1"
                  />
                  Despesas 1
                </label>
                <label className="flex items-center text-sky-900">
                  <input
                    type="checkbox"
                    checked={!mostrarDespesas}
                    onChange={toggleReceitas}
                    className="mr-1"
                  />
                  Receitas
                </label>
              </div>
              {/* <div className="flex items-center max-h-[300px] w-full bg-white p-2 md:p-4 rounded-lg shadow-md"> */}
                {mostrarDespesas ? (
                  <GraficoBarDespesas despesas = {despesas} />
                ) : (
                  <BarChartR receitas={receitas} />
                )}
              {/* </div> */}
            </div>
                  {/* Linha 2 */}
                  <div className="flex flex-row justify-between mb-14">
                    {/* Linha 2 Coluna 1 */}
                    <div className="flex flex-col justify-center w-[45%] min-w-80">
                      {/* Grafico */}
                      <div className="flex justify-start items-center mb-4 w-full">
                        <label className="flex items-center mr-2 md:mr-4 text-sky-900">
                          <input
                            type="checkbox"
                            checked={mostrarDespesas}
                            onChange={toggleDespesas}
                            className="mr-1 md:mr-2"
                          />
                          Despesas 2-1
                        </label>
                        <label className="flex items-center text-sky-900">
                          <input
                            type="checkbox"
                            checked={!mostrarDespesas}
                            onChange={toggleReceitas}
                            className="mr-1 md:mr-2"
                          />
                          Receitas
                        </label>
                      </div>
                      {/* <div className="flex items-center max-h-[300px] w-full bg-white p-2 md:p-4 rounded-lg shadow-md"> */}
                        {mostrarDespesas ? (
                          <BarChart despesas={despesas} />
                        ) : (
                          <BarChartR receitas={receitas} />
                        )}
                      {/* </div> */}
                    </div>
                    {/* Linha 2 Coluna 2 */}
                    <div className="flex flex-col justify-center w-[45%] min-w-80">                
                      {/* Grafico */}
                      <div className="flex justify-start items-center mb-4 w-full">
                        <label className="flex items-center mr-2 md:mr-4 text-sky-900">
                          <input
                            type="checkbox"
                            checked={mostrarDespesas}
                            onChange={toggleDespesas}
                            className="mr-1 md:mr-2"
                          />
                          Despesas 2-2
                        </label>
                        <label className="flex items-center text-sky-900">
                          <input
                            type="checkbox"
                            checked={!mostrarDespesas}
                            onChange={toggleReceitas}
                            className="mr-1 md:mr-2"
                          />
                          Receitas
                        </label>
                      </div>
                      {/* <div className="flex items-center max-h-[300px] w-full bg-white p-2 md:p-4 rounded-lg shadow-md"> */}
                        {mostrarDespesas ? (
                          <BarChart despesas={despesas} />
                        ) : (
                          <BarChartR receitas={receitas} />
                        )}
                      {/* </div> */}
                    </div>             
                  </div>
                </div>
          {/* Lado Direito */}
          <div className="flex flex-col flex-wrap w-[300px] mb-4 h-full p-4 rounded-md shadow-lg items-center  justify-between">
            <div className="flex mb-10 rounded-md shadow-lg p-4"> 
              <CardConta icone="despesas.png"     conta="Despesas"         valor={1520.0} />
            </div>
            <div className="flex mb-10 p-4 rounded-md shadow-lg">
              <CardConta icone="receitas.png"     conta="Receitas"         valor={1850.0} />
            </div>
            <div className="flex mb-10 p-4 rounded-md shadow-lg">
              <CardConta icone="saldo.png"        conta="Saldo disponível" valor={1520.0} />
            </div>
            <div className="flex mb-10 p-4 rounded-md shadow-lg">
              <CardConta icone="investimento.png" conta="Investimentos"    valor={1520.0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
