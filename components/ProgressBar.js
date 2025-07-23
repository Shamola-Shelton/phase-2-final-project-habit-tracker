import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from '../styles/ProgressBar.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressBar = ({ streak, total, percent }) => {
  const data = {
    labels: ['Streak', 'Total Completions', 'Week %'],
    datasets: [
      {
        label: 'Progress',
        data: [streak, total, percent],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      },
    ],
  };

  const options = {
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className={styles.container}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressBar;