import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  labels: string[];
  dataCompensada: number[];
  dataEletrica: number[];
}

const LineChart: React.FC<LineChartProps> = ({ labels, dataCompensada, dataEletrica }) => {
  const datasets = [
    {
      label: 'Energia Compensada',
      data: dataCompensada,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      label: 'Energia Elétrica',
      data: dataEletrica,
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      borderWidth: 2,
      fill: false,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gráfico de Linhas com Dados Agrupados',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;