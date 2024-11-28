import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import UserSidebar from './userSidebar';
import UserNavigation from './userNavigation';
import UserProfile from './userProfile';
import AppliedJobs from './AppliedJobs';
import Setting from './Setting';
// import PostJob from './userAdminPanel/PostJob';
// import PostedJob from './userAdminPanel/PostedJob';
// import Applicants from './userAdminPanel/Applicants';
// import Jobseekers from './Dashboard/Jobseekers';

function userDashboard() {
  const [user, setUser] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/userLogin');
      return;
    }

  

    const userDetail = localStorage.getItem('userDetail');
    if (userDetail) {
      setUser(JSON.parse(userDetail));
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const cancelDeletion = () => {
    setShowPopup(false);
  };

  return (
    <div className=' bg-[#F5F6F6] h-[1284px]'>
      <UserSidebar />
      <UserNavigation />
      <div className="dashboard-content">
        <Routes>
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/appliedJobs" element={<AppliedJobs />} />
          <Route path="/setting" element={<Setting />} /> 
          {/* {/* <Route path="/createjobs" element={<PostJob />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default userDashboard;
