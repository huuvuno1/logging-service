import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../components/Table';
import './index.scss'

function LogTable(props) {
  const data = useSelector((state) => state.logs.value)
  return (
    <div className="log__content">
      <Table data={data} />
    </div>
  );
}

export default LogTable;