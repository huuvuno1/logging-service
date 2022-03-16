import React from 'react';
import Filter from '../Filter';
import Log from '../Log';
import HomeSidebar from '../HomeSidebar';

import './index.scss'

function Home(props) {
    return (
        <div className="dashboard">
            <HomeSidebar />

            <div className="container">
                <Filter />

                <Log />
            </div>
        </div>
    );
}

export default Home;