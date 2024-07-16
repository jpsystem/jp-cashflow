'use client'

// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import BarChart from "./_components/barChar";
import CardConta from "./_components/cardConta";


const despesas = [
  { conta: 'Alimentação', valor: 1200.0 },
  { conta: 'Transporte', valor: 2800.0 },
  { conta: 'Saude', valor: 530.0 },
  { conta: 'Lazer', valor: 830.0 },
  { conta: 'Habitação', valor: 870.0 },
  { conta: 'Educação', valor: 1200.0 },
];

export default function Page(){
  return(
    <div className="flex flex-col min-h-[80vh] items-start gap-4 px-4 pb-4 md:justify-center md:px-6 md:gap-5">
      <div className="flex flex-col items-center w-[90%] m-10 p-0">
        <div className="flex flex-col w-full mb-10 justify-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
            Dashboard
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
            Painel de estatisticas do periodo.
          </p>
        </div>    
        <div className="flex justify-between  w-[100%] mb-10 p-4 rounded-md shadow-lg">
          <CardConta icone="despesas.png" conta="Despesas" valor={1520.00}/>
          <CardConta icone="receitas.png" conta="Receitas" valor={1850.00}/>
          <CardConta icone="saldo.png" conta="Saldo disponivel" valor={1520.00}/>
          <CardConta icone="investimento.png" conta="Investimentos" valor={1520.00}/>
        </div>
        <div className="flex items-center w-[100%] h-[100%] bg-white p-4 rounded-lg shadow-md">
            <BarChart despesas={despesas} />
        </div>
      </div>    
    </div>
  )

}