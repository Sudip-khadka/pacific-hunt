import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import logo from "./assets/logo.png";
import Button from './Components/Button';
import { IoLocationOutline } from 'react-icons/io5';
import { CiClock2 } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';
import Alert from './Dashboard/Components/Alert';

const JobsSearchContainer = styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;`

const Navigation = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 112px;
  background: #FFF;
  box-shadow: 0px 1px 0px 0px #E5E9F2;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;
const JobsBody = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 32px;
  padding: 50px 70px 50px;
  width: 100%;
`;
const JobBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  .upper, .lower {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lower {
    gap: 6px;
  }

  .locationandexpiration {
    color: var(--Neutral-Grey-500, #6B6D6F);
    font-family: "Be Vietnam Pro";
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
`;

const JobFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const JobCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  align-items: left;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
  background: var(--Neutral-White, #FFF);
`;

const JobHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const JobTitle = styled.div`
  color: var(--Neutral-Grey-900, #3C3D3D);
  font-family: "Be Vietnam Pro";
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
`;
const JobsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 70px;
  width: 100%;
`;
const Title = styled.h1`
  margin: 0px;
  color: var(--Neutral-Grey-900, #3C3D3D);
  font-family: "Be Vietnam Pro";
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.48px;
`;


const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const LocationIcon = styled(IoLocationOutline)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const SearchBar = styled.div`
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 5px 2px 8px rgba(0, 114, 170, 0.8);
margin:auto;
padding:12px 24px;
margin:100px 70px 20px ;`
const StyledInput = styled.input`
  width: 100%;
  padding: 16px 60px 16px 40px;
  border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: var(--Primary-500, #01A3E0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputWithIcon = ({ icon: Icon, placeholder, value, onChange }) => (
  <InputContainer>
    <Icon style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} />
    <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
  </InputContainer>
);


function JobsSearching() {
  const [showAlert,setShowAlert]=useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
const [jobLocation, setJobLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [appliedCompany, setAppliedCompany] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (jobTitle) queryParams.set('title', jobTitle);
    if (jobLocation) queryParams.set('location', jobLocation);
    window.history.pushState(null, '', '?' + queryParams.toString());
    // Trigger filtering by calling fetchJobs after updating the URL
    fetchJobs();
  };
  
  const handleClearFilters = () => {
    setJobTitle('');
    setJobLocation('');
    window.history.pushState(null, '', window.location.pathname);
    fetchJobs();
  };
  
  const fetchJobs = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get('title');
    const locationParam = queryParams.get('location');
  
    try {
      const response = await axios.get('https://retoolapi.dev/LRwL3E/availableJobs');
      const filteredJobs = response.data.filter(job => {
        const titleMatch = title ? job.jobTitle.toLowerCase().includes(title.toLowerCase()) : true;
        const locationMatch = locationParam ? job.address.toLowerCase().includes(locationParam.toLowerCase()) : true;
        return titleMatch && locationMatch;
      });
      setJobs(filteredJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName') || "User";
    if (userId) {
      // Assuming you have a way to get the username from userId
      // Here, I am just using a placeholder for demonstration
      const user = { userId: userId, userName: userName }; // Replace with actual user fetching logic
      setUsername(user.userName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUsername("");
    navigate('/'); // Navigate to home or login page after logout
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('title');
    const locationParam = queryParams.get('location');

    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://retoolapi.dev/LRwL3E/availableJobs');
        const filteredJobs = response.data.filter(job => {
          const titleMatch = title ? job.jobTitle.toLowerCase().includes(title.toLowerCase()) : true;
          const locationMatch = locationParam ? job.address.toLowerCase().includes(locationParam.toLowerCase()) : true;
          return titleMatch && locationMatch;
        });
        setJobs(filteredJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [location.search]);

  const getFormattedAddress = (address) => {
    const parts = address.split(',').map(part => part.trim());
    return parts.slice(-2).join(', ');
  };

  const sendApplication = (e,company)=>{
    e.preventDefault();
    if(isLoggedIn){
      setAppliedCompany(company)
      setShowAlert(true);
      setTimeout(()=>{
        setShowAlert(false);

      },3000)
    }
    else{
      navigate('/jobseekerLogin');
    }
  }
  return (
    <JobsSearchContainer>
    <Navigation>
      <Logo>
        <NavLink to='/'><img src={logo} alt="Pacific Hunt logo" /></NavLink>
      </Logo>
      {isLoggedIn? ( <div className='flex gap-2 items-center'><div className='text-white h-[48px] w-[48px] bg-[#01A3E0] rounded-full flex items-center justify-center'><p className='font-bold text-xl'>{username[0]}</p></div> <p>{username}</p>
            <Button width="150px" text="Logout" primary="secondary" onClick={handleLogout} />
          </div>) : (

            <div className="buttons flex gap-16">
        <NavLink to='/jobseekerlogin'>
          <Button text="Sign Up" />
        </NavLink>
        <NavLink to='/employeerlogin'>
          <Button text="Post a Job" primary="primary" />
        </NavLink>
      </div>
      )}
    </Navigation>
    {showAlert && <div className='fixed top-[90px] z-40 right-3'><Alert message={`Application Sucessfully Submitted To ${appliedCompany}.`} /></div> }
      <SearchBar className="searchBar flex items-center  gap-[12px]">
        <div className="search-inputs flex gap-4">
          <InputWithIcon icon={SearchIcon} placeholder="Job title, Keyword..." value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          <InputWithIcon icon={LocationIcon} placeholder="Enter Location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
        </div>
        <Button text="Search Job" primary="primary" onClick={handleSearch} />
        <Button text="Clear Filters" width="150px" onClick={handleClearFilters} />
      </SearchBar>
    <JobsHeader>
      <Title>Current Jobs Openings</Title>
    </JobsHeader>
    <JobsBody>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job.id}>
            <JobHeader>
              <img width="48px" height="48px" src={job.logo} alt={`${job.company} logo`} />
              <Button text="Apply Now" onClick={(e)=>sendApplication(e, job.company)}/>
            </JobHeader>
            <JobBody>
              <div className="upper">
                <JobTitle>{job.jobTitle}</JobTitle>
                <div className="locationandexpiration flex gap-4">
                  <div className="location flex gap-1 items-center"><IoLocationOutline /><p>{getFormattedAddress(job.address)}</p></div>
                  <div className="expiration flex gap-1 items-center"><CiClock2 /> Expires In {job.expiresIn} Days</div>
                </div>
              </div>
              <div className="lower">
                <div className="salary">Salary: Rs.{job.minSalary} - Rs.{job.maxSalary} {`(${job.salaryType})`}</div>
              </div>
            </JobBody>
            <hr />
            <JobFooter>
              <div className="company font-medium">{job.company}</div>
            </JobFooter>
          </JobCard>
        ))
      ) : (
        <div>No jobs found matching your criteria.</div>
      )}
    </JobsBody>
  </JobsSearchContainer>
  );
}

export default JobsSearching;
