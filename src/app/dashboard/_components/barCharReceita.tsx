import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Receita {
  conta: string;
  valor: number;
}

interface BarChartProps {
  receitas: Receita[];
}

export default function BarChart({ receitas }: BarChartProps) {
  const data = {
    labels: receitas.map((receita) => receita.conta),
    datasets: [
      {
        label: "Total da conta",
        data: receitas.map((receita) => receita.valor),
        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
        // borderColor: 'rgba(75, 192, 192, 1)',
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
        text: "Totais das Receitas no Periodo",
      },
    },
  };

  return (
    <Bar data={data} options={options} className="flex max-h-96 text-sky-800" />
  );
}
