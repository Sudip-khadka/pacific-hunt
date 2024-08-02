import React, { useState, useEffect } from 'react';

function EmployeerDashboard() {
  const [adminUsername, setAdminUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('adminUsername');
    if (storedUsername) {
      setAdminUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      Welcome {adminUsername || "Employer"}
    </div>
  );
}

export default EmployeerDashboard;
