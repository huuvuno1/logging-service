import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeSidebar from '../../containers/HomeSidebar';

import './index.scss'
import Discover from '../../containers/Discover';
import Chart from '../../containers/Chart';
import Management from '../Management';

function Home(props) {
    return (
        <div className="dashboard">
            <HomeSidebar />

            <div className="container">
                <Routes>
                    <Route path="/" element={<Discover />} />
                    <Route path="/chart" element={<Chart />} />
                    <Route path="/management" element={<Management />} />
                </Routes>
                
            </div>
        </div>
    );
}

export default Home;