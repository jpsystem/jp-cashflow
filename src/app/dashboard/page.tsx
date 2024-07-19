"use client";

import { useState } from "react";
import BarChart from "./_components/barChar";
import BarChartR from "./_components/barCharReceita";
import CardConta from "./_components/cardConta";

const despesas = [
  { conta: "Alimentação", valor: 1200.0 },
  { conta: "Transporte", valor: 2800.0 },
  { conta: "Saude", valor: 530.0 },
  { conta: "Lazer", valor: 830.0 },
  { conta: "Habitação", valor: 870.0 },
  { conta: "Educação", valor: 1200.0 },
];

const receitas = [
  { conta: "Salário", valor: 2500.0 },
  { conta: "Freelance", valor: 600.0 },
  { conta: "Investimentos", valor: 300.0 },
  { conta: "Outras Receitas", valor: 200.0 },
];

export default function Page() {
  const [mostrarDespesas, setMostrarDespesas] = useState(true);

  const toggleDespesas = () => setMostrarDespesas(true);
  const toggleReceitas = () => setMostrarDespesas(false);

  return (
    <div className="flex flex-col h-[800px] items-center px-4 pt-0 pb-16 md:justify-center md:px-6 md:gap-5 ">
      <div className="flex flex-col items-center w-full max-w-screen-lg m-4 md:m-10 p-0">
        <div className="flex flex-col w-full mb-4 md:mb-10 justify-center">
          <h1 className="text-xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-sky-900 pt-0">
            Dashboard
          </h1>
          <p className="text-sm md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-sky-800 text-center">
            Painel de estatísticas do período.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full mb-4 md:mb-10 p-4 rounded-md shadow-lg gap-4">
          <CardConta icone="despesas.png" conta="Despesas" valor={1520.0} />
          <CardConta icone="receitas.png" conta="Receitas" valor={1850.0} />
          <CardConta
            icone="saldo.png"
            conta="Saldo disponível"
            valor={1520.0}
          />
          <CardConta
            icone="investimento.png"
            conta="Investimentos"
            valor={1520.0}
          />
        </div>

        <div className="flex justify-end items-center mb-4 w-full">
          <label className="flex items-center mr-2 md:mr-4 text-sky-900">
            <input
              type="checkbox"
              checked={mostrarDespesas}
              onChange={toggleDespesas}
              className="mr-1 md:mr-2"
            />
            Despesas
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
        <div className="flex items-center w-full bg-white p-2 md:p-4 rounded-lg shadow-md">
          {mostrarDespesas ? (
            <BarChart despesas={despesas} />
          ) : (
            <BarChartR receitas={receitas} />
          )}
        </div>
      </div>
    </div>
  );
}
