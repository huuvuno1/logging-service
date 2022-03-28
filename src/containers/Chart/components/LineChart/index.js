import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import date from 'date-and-time';

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
import logApi from '../../../../api/v2/logApi';

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



export default function LineChart() {
  const [start, setStart] = useState(new Date().getTime() - 25000)
  const [end, setEnd] = useState(new Date().getTime())
  const [values, setValues] = useState([])
  const time_distance = parseInt((end - start) / 5)
  
  const labels = values.map((value, index) => {
      return date.format(new Date(start + index * time_distance), 'hh:mm:ss DD/MM/YYYY')
  })

  const data = { 
    labels,
    datasets: [
      {
        label: 'ERROR',
        data: values.map((value) => value.find(item => item.key === "ERROR")?.doc_count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: '#ef6f5e',
      },
      {
        label: 'FATAL',
        data: values.map((value) => value.find(item => item.key === "FATAL")?.doc_count),
        borderColor: '#db2b2b',
        backgroundColor: '#db2b2b',
      },
      {
        label: 'WARN',
        data: values.map((value) => value.find(item => item.key === "WARN")?.doc_count),
        borderColor: '#e59e1d',
        backgroundColor: '#e59e1d',
      },
      {
        label: 'INFO',
        data: values.map((value) => value.find(item => item.key === "INFO")?.doc_count),
        borderColor: '#6baf3f',
        backgroundColor: '#6baf3f',
      },
      {
        label: 'DEBUG',
        data: values.map((value) => value.find(item => item.key === "DEBUG")?.doc_count),
        borderColor: '#6bf532',
        backgroundColor: '#6bf532',
      },
      {
        label: 'TRACE',
        data: values.map((value) => value.find(item => item.key === "TRACE")?.doc_count),
        borderColor: '#439410',
        backgroundColor: '#439410',
      },
    ],
  };

  const handleFilter = () => {
    async function fetchData() {
      const data = await logApi.logTracking(start, end)
      console.log(data)
      setValues(data)
    }

    fetchData()
  }

  useEffect(handleFilter, [])

  const handleTimestampChange = (e, id) => {
    if (id === 'time_start') {
      setStart(new Date(e.target.value).getTime())
    } else {
      setEnd(new Date(e.target.value).getTime())
    }
  }


  return (
    <div className='line__chart'>
      <div className='flex space-between'>
        <h1 className='line__chart--label'>Analysis</h1>
        <div className='flex line__chart--filter'>
          <PickTimestamp id='time_start' label='Start time ' onChange={ handleTimestampChange } />
          <PickTimestamp id='time_end' label='End time ' onChange={ handleTimestampChange } />
          <Button type="primary" onClick={ handleFilter } >Filter</Button>
        </div>
      </div>
      <div>
        <Line options={options} data={data}  />
      </div>
    </div>
  )
}
