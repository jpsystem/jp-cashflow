
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { tyDespesaGrafico } from "@/types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface BarChartProps {
  despesas: tyDespesaGrafico[];
}

export default function BarChart({ despesas }: BarChartProps) {
  const data = {
    labels: despesas.map((despesa) => despesa.Grupo),
    datasets: [
      {
        label: "Total da conta",
        data: despesas.map((despesa) => despesa.valorReal),
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
        text: "Totais das Despesas no Periodo",
      },
    },
  };

  return (
    <Bar data={data} options={options} className="flex max-h-96 min-w-[100%] text-sky-800" />
  );
}
