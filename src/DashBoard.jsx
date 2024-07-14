import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Dashboard/NavBar';
import SideBar from './Dashboard/SideBar';
import Configurations from './Dashboard/Configurations';

function Dashboard() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/dashboard/configurations" element={<Configurations />} />
          <Route path="/dashboard/configurations" element={<Configurations />} />
          <Route path="/dashboard/configurations" element={<Configurations />} />
          <Route path="/dashboard/configurations" element={<Configurations />} />
          {/* Add more nested routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
