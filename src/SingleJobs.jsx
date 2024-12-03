import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import logo from "./assets/logo.png";
import Button from "./Components/Button";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Alert from "./Dashboard/Components/Alert";

const apiJobSearchingUrl = import.meta.env.VITE_API_JOBSEARCHING;
const EmployeerDetails = import.meta.env.VITE_API_EMPLOYEER;

const JobsSearchContainer = styled.div`
  width: 100%;
  padding-top: 100px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const JobDiscriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const JobDescription = styled.div`
  width: 70%;
  display: flex;
  margin-left: 100px;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0px 20px 30px;
  align-items: left;
  justify-content: left;
  border: 1px solid #ccc;
  box-shadow: inset 5px 5px 20px rgba(0, 0, 0, 0.3);
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 12px 8px;
  text-align: left;
  color: #555;
  font-size: 16px;

  &:first-child {
    font-weight: bold;
    color: #333;
  }
`;

const RecomendedJobs = styled.div`
  width: 30%;
  display: flex;
  height: 100%;
  overflow: scroll;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const Navigation = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 112px;
  background: #fff;
  box-shadow: 0px 1px 0px 0px #e5e9f2;
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  z-index: 1000;
  transition: width 0.3s ease;
  @media (max-width: 768px) {
    height: ${(props) => (props.isNavOpen ? "100vh" : "50px")};
    width: ${(props) => (props.isNavOpen ? "40%" : "50px")};
    padding: 25px;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    background: ${(props) =>
      props.isNavOpen
        ? "#FFF"
        : "transparent"}; /* Ensure background covers entire width */
    box-shadow: none; /* Optional: remove box-shadow on mobile */
    .userdata {
      display: ${(props) => (props.isNavOpen ? "flex" : "none")};
    }
    flex-direction: column;
  }
  @media (max-width: 500px) {
    padding: 25px 10px 20px 10px;
  }
`;

const MenuIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  cursor: pointer;
  display: none;
  z-index: 15; /* Ensure it's above other elements */
  @media (max-width: 768px) {
    display: ${(props) => (props.isNavOpen ? "none" : "block")};
  }
`;

const CloseIcon = styled.div`
  display: none;
  font-size: 30px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: ${(props) => (props.isNavOpen ? "block" : "none")};
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
  @media (max-width: 768px) {
    display: ${(props) => (props.isNavOpen ? "block" : "none")};
  }
`;
const JobsBody = styled.div`
  height: 700px;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  padding: 50px 70px 50px;
  width: 100%;
  @media (max-width: 955px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 25px;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 25px;
  }
`;
const JobBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  .upper,
  .lower {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lower {
    gap: 6px;
  }

  .locationandexpiration {
    color: var(--Neutral-Grey-500, #6b6d6f);
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
  max-height:290px;
  height:auto;
  flex-direction: column;
  padding: 24px 24px 0px;
  align-items: left;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid var(--Neutral-Grey-100, #e6e7e7);
  background: var(--Neutral-White, #fff);
`;

const JobHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const JobTitle = styled.div`
  color: var(--Neutral-Grey-900, #3c3d3d);
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
  color: var(--Neutral-Grey-900, #3c3d3d);
  font-family: "Be Vietnam Pro";
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.48px;
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #01a3e0;
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
  z-index: 100;
  &:hover {
    background-color: #0182c8;
  }

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
  }
`;

function SingleJobs() {
  const queryParams = new URLSearchParams(window.location.search);
  const jobId = queryParams.get("id");
  // console.log(jobId)
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAppliedAlert, setShowAppliedAlert] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [appliedCompany, setAppliedCompany] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [job, setJob] = useState({
    id: jobId,
    logo: "",
    email: "",
    title: "",
    salary: 0,
    skills: "",
    address: "",
    company: "",
    jobTitle: "",
    expiresIn: 0,
    isExpired: false,
    maxSalary: 0,
    minSalary: 0,
    experience: 0,
    salaryType: "",
    description: "",
  });
  const [userDetails, setuserDetails] = useState({});

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    // console.log("obtained id is ",jobId)

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchJobs = async (page = 1) => {
      setIsLoading(true);

      try {
        // Fetch all jobs
        const response = await axios.get(apiJobSearchingUrl);
        const filteredJobs = response.data;

        // Fetch clicked job using the jobId from the query parameter
        const clickedJobResponse = await axios.get(
          `${apiJobSearchingUrl}/${jobId}`
        );
        const clickedJob = clickedJobResponse.data;

        // Get user details for recommendation
        const user = JSON.parse(localStorage.getItem("user"));

        // Prepare job seeker object for recommendation
        const jobSeeker = {
          skills: user.skills || [],
          experience: user.experience || 0,
          salary: user.expectedSalary || 0,
          education:user.education || 0,
        };
        function matchJobs(jobSeeker, jobs) {
          // Validate input
          if (!jobSeeker || !jobs || jobs.length === 0) {
            console.error("Invalid inputs for recommendation.");
            return [];
          }
        
          // More robust skill normalization
          const normalizeSkills = (skills) => {
            if (typeof skills === 'string') {
              return skills.toLowerCase().split(/[,;]+/).map(skill => skill.trim());
            }
            return (skills || []).map(skill => 
              typeof skill === 'string' ? skill.toLowerCase().trim() : skill
            );
          };
        
          const seekerSkills = new Set(normalizeSkills(jobSeeker.skills));
          const minExpectedSalary = parseInt(jobSeeker.salary) || 0;
        
          // Enhanced recommendation scoring
          const recommendations = jobs.map(job => {
            const jobSkills = new Set(normalizeSkills(job.skills));
            
            // Compute skill match percentage
            const matchingSkills = [...seekerSkills].filter(skill => 
              jobSkills.has(skill.toLowerCase())
            );
            const skillMatchPercentage = (matchingSkills.length / seekerSkills.size) * 100 || 0;
        
            // Salary fit
            const salaryFitScore = job.minSalary && job.maxSalary 
              ? calculateSalaryFitScore(minExpectedSalary, job.minSalary, job.maxSalary)
              : 0;
        
            // Experience match
            const experienceMatch = Math.abs((jobSeeker.experience || 0) - (job.experience || 0)) <= 2;
        
            // Composite score
            const score = (
              skillMatchPercentage * 0.5 + 
              salaryFitScore * 0.3 + 
              (experienceMatch ? 20 : 0)
            );
        
            return {
              job,
              score,
              skillMatchPercentage,
              salaryFitScore
            };
          });
        
          // Sort and filter recommendations
          return recommendations
            .filter(rec => rec.score > 30)  // Only return jobs with meaningful match
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)  // Top 5 recommendations
            .map(rec => rec.job);
        }
        
        // Helper function to calculate salary fit
        function calculateSalaryFitScore(expectedSalary, minSalary, maxSalary) {
          if (!expectedSalary || !minSalary || !maxSalary) return 0;
          
          // If expected salary is within job's salary range
          if (expectedSalary >= minSalary && expectedSalary <= maxSalary) {
            return 100;
          }
          
          // If slightly outside range, give partial score
          const range = maxSalary - minSalary;
          const deviation = Math.abs(expectedSalary - ((minSalary + maxSalary) / 2));
          
          return Math.max(0, 100 * (1 - deviation / range));
        }
        // Generate recommendations
        const recommendationResults = matchJobs(jobSeeker, filteredJobs);
        console.log("Test 1",recommendationResults)//
        const topRecommendations = recommendationResults.map(rec => rec.job);
        
        if (topRecommendations.length === 0) {
          console.warn("No recommendations found. Verify job data and job seeker details.");
        }
        
        setRecommendedJobs(recommendationResults);
        console.log("recomendation",recommendedJobs);
        console.log("top recomendation",topRecommendations);
        

        const userEmail = user.email;
        const filteredApplicants = clickedJob.appliedBy.some(
          (applicant) => applicant.email === userEmail
        );
        setHasApplied(filteredApplicants);

        // Update state with the job details
        setJob({
          id: clickedJob.id,
          logo: clickedJob.logo,
          email: clickedJob.email,
          title: clickedJob.title,
          salary: clickedJob.salary,
          skills: Array.isArray(clickedJob.skills)
            ? clickedJob.skills
            : clickedJob.skills.split(","),
          address: clickedJob.address,
          company: clickedJob.company,
          jobTitle: clickedJob.jobTitle,
          expiresIn: clickedJob.expiresIn,
          isExpired: clickedJob.isExpired,
          maxSalary: clickedJob.maxSalary,
          minSalary: clickedJob.minSalary,
          experience: clickedJob.experience,
          salaryType: clickedJob.salaryType,
          description: clickedJob.description,
        });

        // Simulate paginated data
        const jobsPerPage = 6;
        const newJobs = filteredJobs.slice(
          (page - 1) * jobsPerPage,
          page * jobsPerPage
        );

        setJobs((prevJobs) =>
          page === 1 ? newJobs : [...prevJobs, ...newJobs]
        );
        setHasMore(newJobs.length === jobsPerPage);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      }
    };

    fetchJobs(page); // Initial fetch when component mounts
  }, [page, location]);


  const observer = useRef();
  const lastJobElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData.id;
    const userName = userData.username || "User";
    if (userId) {
      // Assuming you have a way to get the username from userId
      // Here, I am just using a placeholder for demonstration
      const user = { userId: userId, userName: userName }; // Replace with actual user fetching logic
      setUsername(user.userName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/"); // Navigate to home or login page after logout
  };

  const getFormattedAddress = (address) => {
    const parts = address.split(",").map((part) => part.trim());
    return parts.slice(-2).join(", ");
  };
  const alreadyApplied = () => {
    setShowAppliedAlert(true);
    setTimeout(() => {
      setShowAppliedAlert(false);
    }, 3000);
  };
  const sendApplication = async (e, company) => {
    e.preventDefault();

    if (isLoggedIn) {
      setAppliedCompany(company);
      setShowAlert(true);
      setHasApplied(true);

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      const userDetail = JSON.parse(localStorage.getItem("user"));

      // Add a default status of "Pending" to the user detail
      const userWithStatus = { ...userDetail, status: "Pending" };

      try {
        // Fetch the current job details
        const appliedJob = await axios.get(`${apiJobSearchingUrl}/${jobId}`);
        const jobDetails = appliedJob.data;

        // Update the appliedBy field with the new user details
        const updatedAppliedBy = [...jobDetails.appliedBy, userWithStatus];

        // Send the updated job object back to the server
        await axios.patch(`${apiJobSearchingUrl}/${jobId}`, {
          appliedBy: updatedAppliedBy,
        });

        console.log("Application submitted successfully!");
      } catch (error) {
        console.error("Error while submitting the application:", error);
      }
    } else {
      navigate("/jobseekerLogin");
    }
  };

  const navigateToJob = (e, id) => {
    e.preventDefault();
    if (isLoggedIn) {
      setAppliedCompany(id);
      navigate(`/jobs?id=${id}`);
      //   fetchJobs();
      //   setShowAlert(true);
      //   setTimeout(()=>{
      //     setShowAlert(false);

      //   },3000)
    } else {
      navigate("/jobseekerLogin");
    }
  };

  return (
    <>
      {showButton && (
        <BackToTopButton onClick={scrollToTop}>
          <FaArrowCircleUp />
        </BackToTopButton>
      )}
      <Navigation isNavOpen={isNavOpen}>
        <Logo>
          <NavLink to="/">
            <LogoContainer isNavOpen={isNavOpen}>
              {" "}
              <img src={logo} alt="Pacific Hunt logo" />
            </LogoContainer>
          </NavLink>
          <MenuIcon isNavOpen={isNavOpen} onClick={toggleNav}>
            <IoMenu />
          </MenuIcon>
          <CloseIcon isNavOpen={isNavOpen} onClick={toggleNav}>
            <IoClose />
          </CloseIcon>
        </Logo>
        {isLoggedIn ? (
          <div className="userdata flex flex-col md:flex-row gap-2 items-center">
            <NavLink to="/userDashboard">
              <span className="flex items-center gap-2">
                <div className="text-white h-[48px] w-[48px] bg-[#01A3E0] rounded-full flex items-center justify-center">
                  <p className="font-bold text-xl">{username[0]}</p>
                </div>
                <p className="font-bold">{username}</p>
              </span>
            </NavLink>
            <Button
              width="150px"
              text="Logout"
              primary="secondary"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <div className="userdata buttons flex xl:gap-16 flex-col lg:flex-row gap-2 items-left">
            <NavLink to="/jobseekerlogin">
              <Button text="Sign Up" />
            </NavLink>
            <NavLink to="/employeerlogin">
              <Button text="Post a Job" primary="primary" />
            </NavLink>
          </div>
        )}
      </Navigation>
      <JobsSearchContainer>
        {showAlert && (
          <div className="fixed top-[100px] flex justify-center items-center ">
            <Alert
              message={`Application Successfully Submitted To ${appliedCompany}.`}
            />
          </div>
        )}
        {showAppliedAlert && (
          <div className="fixed top-[100px] flex justify-center items-center ">
            <Alert message={`You Have Already Applied.`} />
          </div>
        )}

        <JobDiscriptionContainer>
          <JobDescription>
            <Title>Job Details</Title>
            <Table>
              <tbody>
                <TableRow>
                  <TableCell>
                    <img src={job.logo} width="200px" alt="" />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell>{job.company}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>{job.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>{job.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{job.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Salary</TableCell>
                  <TableCell>
                    {job.minSalary} - {job.maxSalary} ({job.salaryType})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Skills</TableCell>
                  <TableCell>{job.skills}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Experience</TableCell>
                  <TableCell>{job.experience} years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{job.description}</TableCell>
                </TableRow>
              </tbody>
            </Table>
            {hasApplied ? (
              <Button
                width="200px"
                text="Already Applied !"
                primary="secondary"
                onClick={(e) => alreadyApplied()}
              />
            ) : (
              <Button
                width="150px"
                text="Apply Now"
                primary="primary"
                onClick={(e) => sendApplication(e, job.company)}
              />
            )}
          </JobDescription>
          <RecomendedJobs>
        <JobsHeader>
          <Title>Recommended Jobs</Title>
        </JobsHeader>
        <JobsBody>
          {recommendedJobs.length > 0 ? (
            recommendedJobs.map((job) => (
              <JobCard key={job.id}>
                <JobHeader>
                  <div className="company text-xl font-bold">
                    {job.company || "Unknown Company"}
                  </div>
                  <img
                    width="48px"
                    height="48px"
                    src={job.logo}
                    alt={`${job.company} logo`}
                  />
                </JobHeader>
                <JobBody>
                  <div className="upper">
                    <JobTitle>{job.title}</JobTitle>
                    <div className="locationandexpiration flex gap-4">
                      <div className="location flex gap-1 items-center">
                        <IoLocationOutline />
                        <p>{getFormattedAddress(job.address)}</p>
                      </div>
                      <div className="expiration flex gap-1 items-center">
                        <CiClock2 /> Expires In {job.expiresIn} Days
                      </div>
                    </div>
                  </div>
                  <div className="lower">
                    <div className="salary">
                      Salary: Rs.{job.minSalary} - Rs.{job.maxSalary}{" "}
                      {`(${job.salaryType})`}
                    </div>
                  </div>
                </JobBody>
                <hr />
                <JobFooter>
                  <Button
                    text="View Details"
                    width="150px"
                    onClick={(e) => navigateToJob(e, job.id)}
                  />
                </JobFooter>
              </JobCard>
            ))
          ) : (
            <div>
              No recommended jobs found. Try updating your profile or skills.
            </div>
          )}
        </JobsBody>
      </RecomendedJobs>
        </JobDiscriptionContainer>
        {isLoading && <div className="loading-spinner">Loading...</div>}
      </JobsSearchContainer>
    </>
  );
}

export default SingleJobs;
