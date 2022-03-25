import React, { useEffect, useState } from 'react';
import logApi from '../../api/v2/logApi';
import DoughnutChart from './components/DoughnutChart';
import LineChart from './components/LineChart';
import './index.scss'

function LogChart(props) {
  const [overview, setOverview] = useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await logApi.getOverview();
      setOverview(result.data.data)
    }

    fetchData()
  }, [])

  return (
    <div className='log__chart'>
      <DoughnutChart {...overview} />
      <LineChart />
    </div>
  );
}

export default LogChart;