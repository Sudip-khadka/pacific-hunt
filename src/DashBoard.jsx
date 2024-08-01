import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './Dashboard/NavBar';
import SideBar from './Dashboard/SideBar';
import Configurations from './Dashboard/Configurations';
import Jobseekers from './Dashboard/Jobseekers';
import RegistryManager from './Dashboard/RegistryManager';
import Employer from './Dashboard/Employer';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('adminEmail');
    if (!email) {
      navigate('/employeerLogin'); // Use navigate to redirect
    }
  }, [navigate]);
  return (
    <div className=' bg-[#F5F6F6] h-[1284px]'>
      <NavBar />
      <SideBar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/configurations/*" element={<Configurations />} />
          <Route path="/jobseeker" element={<Jobseekers />} />
          <Route path="/registermanagers" element={<RegistryManager />} />
          <Route path="/employer/*" element={<Employer />} />
          {/* Add more nested routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
