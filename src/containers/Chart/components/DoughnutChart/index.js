import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './index.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart(props) {
  const { totalRecord, error = 10, warn = 10, info = 10 } = props

  const data = {
    labels: ['ERROR, FATAL', 'WARN', 'INFO, DEBUG, TRACE'],
    datasets: [
      {
        label: '# of Votes',
        data: [error, warn, info],
        backgroundColor: [
          'red',
          'orange',
          'green',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log("char", data)


  return (
    <>
      <h1>Overview ~ {totalRecord} records </h1>
      <div className='doughnut__chart'>
        <Doughnut data={data}  />
      </div>
    </>
  )
}
