import './App.css';
import LandingPage from './LandingPage';
import Dashboard from './DashBoard';
import './styles/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
