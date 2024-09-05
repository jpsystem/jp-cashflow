import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { tyEntradasGrafico } from '@/types/types';
import { useQuery } from 'react-query';
import { useGlobalContext } from '@/app/contextGlobal';
import { RetEstatisticaEntradas } from '@/actions/graficosActions';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BarChartProps {
  entradas: tyEntradasGrafico[];
}

export default function GraficoPizzaEntradas() {

    //Coloca o id di usuário no contexto
    const { usuarioId, periodoId, setPeriodoId} = useGlobalContext();

    // //Carrega as Despesas para o grafico
    // const { data, isLoading, refetch } = useQuery( ["despesas", periodoId], async () => {
    //   const response = await RetEstatisticaEntradas(periodoId);
    //   //setDespesas(response);
    //   return response;
    // })

  const entradas:tyEntradasGrafico[] = [
  {SubGrupoID: 1, SubGrupo: "JPsystem", valorReal: 1500.00},
  { SubGrupoID: 2, SubGrupo: "Betânia", valorReal: 2500.00 },
  { SubGrupoID: 3, SubGrupo: "Aluguéis", valorReal: 100.00 },
  { SubGrupoID: 4, SubGrupo: "Outros", valorReal: 0 },
  ];


  //console.log("AQUI: ", data);

  const datas = {
    labels: entradas?.map(e => e.SubGrupo),
    datasets: [
      {
        data: entradas?.map(e => e.valorReal),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Distribuição das Entradas',
      },
    },
  }
  return <Pie data={datas} options={options} />;
}