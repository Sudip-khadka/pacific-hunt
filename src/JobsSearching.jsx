import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import logo from "./assets/logo.png";
import Button from './Components/Button';
import { IoLocationOutline } from 'react-icons/io5';
import { CiClock2 } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';
import { FaArrowCircleUp } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Alert from './Dashboard/Components/Alert';

const apiJobSearchingUrl = import.meta.env.VITE_API_JOBSEARCHING;
const EmployeerDetails = import.meta.env.VITE_API_EMPLOYEER;

const JobsSearchContainer = styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
position:relative;
`

const Navigation = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 112px;
  background: #FFF;
  box-shadow: 0px 1px 0px 0px #E5E9F2;
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  z-index: 1000;
  transition: width 0.3s ease;
  @media (max-width: 768px) {
  
    height: ${props => (props.isNavOpen ? '100vh' : '50px')};
    width: ${props => (props.isNavOpen ? '40%' : '50px')};
    padding: 25px;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    background: ${props => (props.isNavOpen ? '#FFF' : 'transparent')}; /* Ensure background covers entire width */
    box-shadow: none; /* Optional: remove box-shadow on mobile */
    .userdata{
    display:${props => (props.isNavOpen ? 'flex' : 'none')};}
    flex-direction:column;
  }
     @media (max-width: 500px) {
     padding:25px 10px 20px 10px;
     }
`;

const MenuIcon = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
  font-size: 40px;
  cursor: pointer;
  display:none;
  z-index: 15; /* Ensure it's above other elements */
  @media (max-width: 768px) {
    display: ${props => (props.isNavOpen ? 'none' : 'block')};
  }
`;

const CloseIcon = styled.div`
  display: none;
  font-size: 30px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: ${props => (props.isNavOpen ? 'block' : 'none')};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px; /* Space between logo and menu items */
  }
`;
const LogoContainer = styled.div`
@media(max-width:768px){
  display: ${props => (props.isNavOpen ? 'block' : 'none')};
  }
`;
const JobsBody = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 32px;
  padding: 50px 70px 50px;
  width: 100%;
  @media (max-width:955px){
    grid-template-columns: repeat(2, 1fr);
  padding:25px;}
  @media (max-width:600px){
    grid-template-columns: repeat(1, 1fr);
  padding:25px;}
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
font-family: "Be Vietnam Pro";
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 5px 2px 8px rgba(0, 114, 170, 0.8);
margin:auto;
padding:12px 24px;
margin:100px 70px 20px ;
@media(max-width:768px){
margin:50px;
width:80%;
flex-direction:column;}`
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
const BackToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #01A3E0;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 34px;
  transition: opacity 0.3s ease;
z-index:100;
  &:hover {
    background-color: #0182c8;
  }

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
  }
`;


function JobsSearching() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showAlert,setShowAlert]=useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
const [jobLocation, setJobLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);
  const [appliedCompany, setAppliedCompany] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

const handleScroll = () => {
  if (window.scrollY > 200) {
    setShowButton(true);
  } else {
    setShowButton(false);
  }
};

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (jobTitle) queryParams.set('title', jobTitle);
    if (jobLocation) queryParams.set('location', jobLocation);
    window.history.pushState(null, '', '?' + queryParams.toString());
    // Trigger filtering by calling fetchJobs after updating the URL
    fetchJobs(1);
  };
  
  const handleClearFilters = () => {
    setJobTitle('');
    setJobLocation('');
    window.history.pushState(null, '', window.location.pathname);
    setPage(1);  // Reset page number to 1 to start from the first page
  setJobs([]);  // Clear the current jobs to fetch the new set
  fetchJobs(1);  // Fetch jobs from the first page
  };
  
  const fetchJobs = async (page = 1) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get('title');
    const locationParam = queryParams.get('location');
  
    try {
      const response = await axios.get(apiJobSearchingUrl);
      const filteredJobs = response.data.filter(job => {
        const titleMatch = title ? job.title.toLowerCase().includes(title.toLowerCase()) : true;
        const locationMatch = locationParam ? job.address.toLowerCase().includes(locationParam.toLowerCase()) : true;
        return titleMatch && locationMatch;
      });
  
      // Simulate paginated data by slicing the filtered jobs
      const jobsPerPage = 6;
      const newJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
  
      setJobs(prevJobs => (page === 1 ? newJobs : [...prevJobs, ...newJobs]));
      setHasMore(newJobs.length === jobsPerPage);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setIsLoading(false);
    }
  };
 
  
  
  const observer = useRef();
  const lastJobElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);
    
  useEffect(() => {
    const userData= JSON.parse(localStorage.getItem('user'));
    const userId = userData.id;
    const userName = userData.username || "User";
    if (userId) {
      const user = { userId: userId, userName: userName }; 
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
        const response = await axios.get(apiJobSearchingUrl);

        const filteredJobs = response.data.filter(job => {
          const titleMatch = title ? job.title.toLowerCase().includes(title.toLowerCase()) : true;
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
  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const getFormattedAddress = (address) => {
    const parts = address.split(',').map(part => part.trim());
    return parts.slice(-2).join(', ');
  };

  const sendApplication = (e,id)=>{
    e.preventDefault();
    if(isLoggedIn){
      setAppliedCompany(id);
      navigate(`/jobs?id=${id}`)
    }
    else{
      navigate('/jobseekerLogin');
    }
  }
  return (
    <>
    {showButton && (
  <BackToTopButton onClick={scrollToTop}>
    <FaArrowCircleUp />
  </BackToTopButton>
)}
    <Navigation isNavOpen={isNavOpen}>
    <Logo>
        <NavLink to='/'><LogoContainer isNavOpen={isNavOpen}> <img  src={logo} alt="Pacific Hunt logo" /></LogoContainer></NavLink>
        <MenuIcon isNavOpen={isNavOpen} onClick={toggleNav}>
          <IoMenu />
        </MenuIcon>
        <CloseIcon isNavOpen={isNavOpen} onClick={toggleNav}>
          <IoClose />
        </CloseIcon>
      </Logo>
      {isLoggedIn? ( <div className='userdata flex flex-col md:flex-row gap-2 items-center'>
        <NavLink to='/userDashboard'>
  <span className='flex items-center gap-2'>
    <div className='text-white h-[48px] w-[48px] bg-[#01A3E0] rounded-full flex items-center justify-center'>
      <p className='font-bold text-xl'>{username[0]}</p>
    </div>
    <p className='font-bold'>{username}</p>
  </span></NavLink>
  <Button width="150px" text="Logout" primary="secondary" onClick={handleLogout} />
</div>) : (

            <div className="userdata buttons flex xl:gap-16 flex-col lg:flex-row gap-2 items-left">
        <NavLink to='/jobseekerlogin'>
          <Button text="Sign Up" />
        </NavLink>
        <NavLink to='/employeerlogin'>
          <Button text="Post a Job" primary="primary" />
        </NavLink>
      </div>
      )}
    </Navigation>
    <JobsSearchContainer>
    {showAlert && (
        <div className="fixed right-[50px] top-[100px] flex justify-center items-center ">
          <Alert message={`Application Successfully Submitted To ${appliedCompany}.`} />
        </div>
      )}
      <SearchBar className="searchBar flex items-center  gap-[12px]">
        <h1 className='font-bold'>Search <span className=' text-[#01A3E0]'>Jobs</span></h1>
        <div className="search-inputs flex gap-4 flex-col md:flex-row">
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
          <JobCard ref={lastJobElementRef} key={job.id}>
            <JobHeader>
              <img width="48px" height="48px" src={job.logo} alt={`${job.company} logo`} />
              <Button text="View Details" width="150px" onClick={(e)=>sendApplication(e, job.id)}/>
            </JobHeader>
            <JobBody>
              <div className="upper">
                <JobTitle>{job.title}</JobTitle>
                <div className="locationandexpiration flex gap-4">
                  <div className="location flex gap-1 items-center"><IoLocationOutline /><p>{job.address}</p></div>
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
        <div>Searching Jobs matching your criteria. If Not found Try Clearing Filters Or Changing It...</div>
      )}
    </JobsBody>
    {isLoading && <div className="loading-spinner">Loading...</div>}
  </JobsSearchContainer>
  </>
  );
}

export default JobsSearching;
