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
    <div className="flex flex-col min-h-[80vh] items-start gap-4 px-4 pb-4 md:justify-center md:px-6 md:gap-5">
      <div className="flex flex-col items-center w-[90%] m-10 p-0">
        <div className="flex flex-col w-full mb-10 justify-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-sky-900">
            Dashboard
          </h1>
          <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-sky-800 text-center">
            Painel de estatisticas do periodo.
          </p>
        </div>
        <div className="flex justify-between w-[100%] mb-10 p-4 rounded-md shadow-lg">
          <CardConta icone="despesas.png" conta="Despesas" valor={1520.0} />
          <CardConta icone="receitas.png" conta="Receitas" valor={1850.0} />
          <CardConta
            icone="saldo.png"
            conta="Saldo disponivel"
            valor={1520.0}
          />
          <CardConta
            icone="investimento.png"
            conta="Investimentos"
            valor={1520.0}
          />
        </div>

        <div className="flex justify-end items-center mb-4 w-full">
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={mostrarDespesas}
              onChange={toggleDespesas}
              className="mr-2"
            />
            Despesas
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={!mostrarDespesas}
              onChange={toggleReceitas}
              className="mr-2"
            />
            Receitas
          </label>
        </div>

        <div className="flex items-center w-[100%] h-[100%] bg-white p-4 rounded-lg shadow-md">
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
