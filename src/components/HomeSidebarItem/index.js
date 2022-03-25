import React from 'react';
import { NavLink } from "react-router-dom";
import './index.scss'

function SidebarItem(props) {
  const { to, label, icon = 'bx bxs-bar-chart-alt-2'} = props

  return (
    <NavLink to={ to } className={ ({isActive}) => isActive ? `menu__item selected` : 'menu__item' } >
      <div className="menu__item--icon">
        <i className={ icon }></i>
      </div>
      <div className="menu__item--text">
        { label }
      </div>
    </NavLink>
  );
}

export default SidebarItem;