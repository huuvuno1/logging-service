import React, { useEffect, useState } from 'react';
import './index.scss'
import Logo from '../../assets/images/logo.png'
import HomeSidebarItem from '../../components/HomeSidebarItem';

function Sidebar(props) {
    const [menu, setMenu] = useState([])

    useEffect(() => {
      setMenu([
        {
          to: '/',
          label: 'Discover',
          icon: 'bx bxs-bar-chart-alt-2'
        },
        {
          to: '/chart',
          label: 'Chart',
          icon: 'bx bx-scatter-chart'
        },
        {
          to: '/management',
          label: 'Management',
          icon: 'bx bxs-offer spin_arround'
        }
      ])
    }, [])


    return (
      <div className="sidebar">
        <a href="/" className="logo">
          <img src={ Logo } alt="" />
          <h1>kibana</h1>
        </a>

        <div className="menu">
          {
            menu.map((value, index) => <HomeSidebarItem key={ index } { ...value } />)
          }
        </div>
      </div>
    );
}

export default Sidebar;