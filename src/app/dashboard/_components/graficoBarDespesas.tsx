import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Despesa = {
  GrupoID: number;
  Grupo: string;
  valorOrcado: number;
  valorReal: number;
}

interface BarChartProps {
  despesas: Despesa[];
}

export default function GraficoBarDespesas({ despesas }: BarChartProps) {

  const data = {
    labels: despesas.map((despesa) => despesa.Grupo),
    datasets: [
      {
        label: "Valor Real",
        data: despesas.map((despesa) => despesa.valorReal),
        backgroundColor: "rgba(252, 211, 77, 0.5)",
        borderColor: "rgba(180, 83, 9, 1)",
        borderWidth: 1,
      },
      {
        label: "Valor Orçado",
        data: despesas.map((despesa) => despesa.valorOrcado),
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