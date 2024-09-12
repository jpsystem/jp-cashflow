'use client'

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { useDashboardContext } from "./contextDashboardProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GraficoBarSubContas() {
  const { dadosBarSubContas } = useDashboardContext();
  console.log("Dados:", dadosBarSubContas)

  const data = {
    labels: dadosBarSubContas.map((subGrupo) => subGrupo.SubGrupo),
    datasets: [
      {
        label: "Total da conta",
        data: dadosBarSubContas.map((subGrupo) => subGrupo.valorReal),
        backgroundColor: "rgba(252, 211, 77, 0.5)",
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
        text: `Destribuição das Sub-Contas`,
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} className="flex max-h-96 min-w-[100%] text-sky-800" />
    </>
  );
}
