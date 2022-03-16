import React from 'react';
import './index.scss'

function LogSidebarItem(props) {
  const { icon, label } = props

  return (
    <div className="log__fields--item">
      <i className={ icon } />
      <span>{ label }</span>
    </div>
  );
}

export default LogSidebarItem;