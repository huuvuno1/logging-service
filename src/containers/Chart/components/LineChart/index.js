import React from 'react';
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
import { Line } from 'react-chartjs-2';
import './index.scss'
import PickTimestamp from '../../../../components/PickTimestamp'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Log Chart',
    },
  },
};

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

export const data = {
  labels,
  datasets: [
    {
      label: 'ERROR',
      data: labels.map(() => parseInt(Math.random(1, 100)*100)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'WARN',
      data: labels.map(() => parseInt(Math.random(1, 100)*100)),
      borderColor: '#f3dd3d',
      backgroundColor: '#ebcf00',
    },
    {
      label: 'INFO',
      data: labels.map(() => parseInt(Math.random(1, 100)*100)),
      borderColor: '#3cdb6d',
      backgroundColor: '#6e957a',
    },
  ],
};

export default function LineChart() {
  const handleTimestampChange = (id) => {

  }


  return (
    <div className='line__chart'>
      <div className='flex space-between'>
        <h1 className='line__chart--label'>Analysis</h1>
        <div className='flex'>
          <PickTimestamp id='time_start' label='Start time' onChange={ handleTimestampChange } />
          <PickTimestamp id='time_end' label='End time' onChange={ handleTimestampChange } />
        </div>
      </div>
      <div>
        <Line options={options} data={data}  />;
      </div>
    </div>
  )
}
