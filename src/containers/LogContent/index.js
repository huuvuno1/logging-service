import React from 'react';
import LogTable from '../../components/LogTable';
import './index.scss'

function LogContent(props) {

  // get data from redux....
  const data = [{"_id":"622ad8e891c3ac5d31e3d953","level":"WARN","message":"save","timestamp":"2022-10-09T17:00:00.000Z","service":"auth_service"},{"_id":"622eb97e8737ba4aa3878115","level":"ERROR","message":"save to","timestamp":"2022-10-09T19:23:00.000Z","service":"auth_service"},{"_id":"622eb9848737ba4aa3878116","level":"INFO","message":"to save to","timestamp":"2022-10-09T17:00:00.000Z","service":"auth_service"}]


  return (
    <div className="log__content">
      <LogTable data={data} />
    </div>
  );
}

export default LogContent;