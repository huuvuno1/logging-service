import React from 'react';
import './index.scss'

function SidebarItem(props) {
  const { to, label, icon = 'bx bxs-bar-chart-alt-2', selected } = props

  return (
    <a href={ to } className={ `menu__item ${selected ? 'selected' : ''}` }>
      <div className="menu__item--icon">
        <i className={ icon }></i>
      </div>
      <div className="menu__item--text">
        { label }
      </div>
    </a>
  );
}

export default SidebarItem;