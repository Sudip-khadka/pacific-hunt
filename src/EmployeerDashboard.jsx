import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import EmployeerSidebar from './EmployeerSidebar';
import EmployeerNavigation from './EmployeerNavigation';
import Profile from './EmployeerAdminPanel/Profile';
import PostJob from './EmployeerAdminPanel/PostJob';
import PostedJob from './EmployeerAdminPanel/PostedJob';
import Applicants from './EmployeerAdminPanel/Applicants';
import Jobseekers from './Dashboard/Jobseekers';

function EmployeerDashboard() {
  const [adminUsername, setAdminUsername] = useState('');
  const [employees, setEmployees] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail) {
      navigate('/employeerLogin');
      return;
    }

    if (adminEmail === 'superadmin@gmail.com') {
      navigate('/dashboard/jobseeker');
      return;
    }

    setAdminUsername(adminEmail);
    const employeerDetail = localStorage.getItem('employeerDetail');
    if (employeerDetail) {
      setEmployees(JSON.parse(employeerDetail));
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminPassword');
    localStorage.removeItem('employeerDetail');
    navigate('/');
  };

  const cancelDeletion = () => {
    setShowPopup(false);
  };

  return (
    <div className=' bg-[#F5F6F6] h-[1284px]'>
      <EmployeerSidebar />
      <EmployeerNavigation />
      <div className="dashboard-content">
        <Routes>
          <Route path="/employeerprofile" element={<Profile />} />
          <Route path="/createjobs" element={<PostJob />} />
          <Route path="/postedjobs" element={<PostedJob />} />
          <Route path="/applicants" element={<Applicants />} />
        </Routes>
      </div>
    </div>
  );
}

export default EmployeerDashboard;
