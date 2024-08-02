import './App.css';
import LandingPage from './LandingPage';
import Dashboard from './DashBoard';
import './styles/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import JobSeekerLogin from './Logins/JobSeekerLogin';
import EmployeerLogin from './Logins/EmployeerLogin';
import UserDashboard from './UserDashBoard/UserDashboard';
import JobSeekerSignup from './Logins/JobSeekerSignup';
import JobsSearching from './JobsSearching';
import UnderConstruction from './UnderConstruction';
import EmployeerSignup from './Logins/EmployeerSignup';
import EmployeerDashboard from './EmployeerDashboard';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobseekerlogin" element={<JobSeekerLogin />} />
        <Route path="/jobseekerSignUp" element={<JobSeekerSignup />} />
        <Route path="/employeerlogin" element={<EmployeerLogin />} />
        <Route path="/employeerSignUp" element={<EmployeerSignup />} />
        <Route path="/jobsSearching" element={<JobsSearching />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/employeerDashboard" element={<EmployeerDashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
