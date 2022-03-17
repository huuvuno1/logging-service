import React from 'react';
import LogContent from '../LogTable';
import LogSidebar from '../LogSidebar';
import './index.scss'

function Log(props) {
  return (
    <div className="log">
      <LogSidebar />

      <LogContent />
    </div>
  );
}

export default Log;