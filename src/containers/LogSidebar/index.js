import React, { useEffect, useState } from 'react';
import LogSidebarItem from '../../components/LogSidebarItem';
import './index.scss'

function LogSidebar(props) {
  const [ fields, setFields ] = useState([])
  useEffect(() => {
    setFields([
      {
        icon: 'bx bx-text',
        label: '_id'
      },
      {
        icon: 'bx bxs-timer',
        label: 'timestamp'
      },
      {
        icon: 'bx bx-text',
        label: 'level'
      },
      {
        icon: 'bx bx-text',
        label: 'service'
      },
      {
        icon: 'bx bx-text',
        label: 'message'
      },
      {
        icon: 'bx bx-text',
        label: 'detail'
      }
    ])
  }, [])


  return (
      <div className="log__sidebar">
      <h1 className="log__sidebar--header">
        Available Fields
      </h1>
      <div className="log__fields">
        {
          fields.map((value, index) => <LogSidebarItem key={ index } { ...value } />)
        }
      </div>
    </div>
  );
}

export default LogSidebar;