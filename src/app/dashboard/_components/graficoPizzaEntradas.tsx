"use client"

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDashboardContext } from './contextDashboardProvider';
import { useGlobalContext } from '@/app/contextGlobal';
import { useEffect } from 'react';
import { RetEstatisticaEntradas } from '@/actions/graficosActions';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraficoPizzaEntradas() {
  const { dadosPizzaEntradas, setDadosPizzaEntradas } = useDashboardContext();
  const { periodoId } = useGlobalContext();

  
  useEffect(() => {
    async function carregaDados() {
      const response = await RetEstatisticaEntradas(periodoId);
      setDadosPizzaEntradas(response);
    }
    
    if(periodoId){
      carregaDados();
    }
  },[periodoId, setDadosPizzaEntradas]);

  const data = {
    labels: dadosPizzaEntradas?.map(e => e.SubGrupo),
    datasets: [
      {
        data: dadosPizzaEntradas?.map(e => e.valorReal),
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
  return <Pie data={data} options={options} />;
}