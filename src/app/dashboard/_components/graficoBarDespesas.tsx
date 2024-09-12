"use client"

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { useDashboardContext } from "./contextDashboardProvider";
import { useGlobalContext } from "@/app/contextGlobal";
import { useEffect } from "react";
import { RetEstatisticaDespesas } from "@/actions/graficosActions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GraficoBarDespesas() {
  const { dadosBarDespesas, setDadosBarDespesas } = useDashboardContext();
  const { periodoId } = useGlobalContext();

  
  useEffect(() => {
    async function carregaDados() {
      const response = await RetEstatisticaDespesas(periodoId);
      setDadosBarDespesas(response);
    }
    
    if(periodoId){
      carregaDados();
    }
  },[periodoId, setDadosBarDespesas]);


  const data = {
    labels: dadosBarDespesas.map((despesa) => despesa.Grupo),
    datasets: [
      {
        label: "Valor Real",
        data: dadosBarDespesas.map((despesa) => despesa.valorReal),
        backgroundColor: "rgba(252, 211, 77, 0.5)",
        borderColor: "rgba(180, 83, 9, 1)",
        borderWidth: 1,
      },
      {
        label: "Valor Orçado",
        data: dadosBarDespesas.map((despesa) => despesa.valorOrcado),
        backgroundColor: "rgba(247, 139, 139, 0.5)",
        borderColor: "rgba(180, 83, 9, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        color:'rgb(7 89 133)',
        display: true,
        text: "Totais das Despesas no Periodo",
      },
    },
  };
  return (
    <Bar data={data} options={options} className="flex max-h-96 min-w-[100%] text-sky-800" />
  );
}