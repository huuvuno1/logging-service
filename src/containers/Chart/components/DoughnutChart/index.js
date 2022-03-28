import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './index.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart(props) {
  const overview = (props.overview && props.overview.sort((a, b) => a.key > b.key)) || []
  const values = overview.map(item => item.doc_count)
  const labels = overview.map(item => item.key)

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Logs',
        data: values,
        backgroundColor: [
          '#6bf532',
          '#6baf3f',
          '#319300',
          '#db2b2b',
          '#e59e1d',
          '#ef6f5e',
        ],
        borderColor: [
          '#6bf532',
          '#6baf3f',
          '#319300',
          '#db2b2b',
          '#e59e1d',
          '#ef6f5e',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
      <h1>Overview ~ { values.reduce((acc, value) => acc + value, 0) } records </h1>
      <div className='doughnut__chart'>
        <Doughnut data={data}  />
      </div>
    </>
  )
}
