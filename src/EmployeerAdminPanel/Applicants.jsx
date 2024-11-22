import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const jobsApi = import.meta.env.VITE_API_JOBSEARCHING; // Replace with actual API endpoint

// Styled Components
const Container = styled.div`
  margin-left: 264px;
  padding: 20px;
  max-width: 1200px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const JobCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const JobHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const JobLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #eee;
`;

const JobInfo = styled.div`
  flex: 1;
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  color: #444;
  margin: 0;
`;

const CompanyName = styled.p`
  font-size: 1rem;
  color: #777;
  margin: 4px 0;
`;

const JobDetails = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin: 0;
`;

const ApplicantsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
`;

const ApplicantItem = styled.li`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center
  ;
`;

const ApplicantDetails = styled.div`
border:1px solid #ccccc;
  flex: 1;
`;

const StatusButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;

  &.approve {
    background-color: #4caf50;
    color: white;
  }

  &.reject {
    background-color: #ff4d4d;
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const NoJobsMessage = styled.p`
  font-size: 1.2rem;
  color: #888;
  text-align: center;
  margin-top: 40px;
`;

function Applicants() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(jobsApi); // Fetch all jobs
        const companyDetails = JSON.parse(
          localStorage.getItem("employeerDetail")
        );
        const companyEmail = companyDetails?.companyEmail || "";

        if (companyEmail) {
          // Filter jobs based on the logged-in company's email
          const filteredJobs = response.data.filter(
            (job) => job.email === companyEmail
          );
          setJobs(filteredJobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to handle updating applicant status
  const updateApplicantStatus = async (jobId, applicantEmail, status) => {
    try {
      const updatedJobs = jobs.map((job) => {
        if (job.id === jobId) {
          const updatedApplicants = job.appliedBy.map((applicant) =>
            applicant.email === applicantEmail
              ? { ...applicant, status }
              : applicant
          );
          return { ...job, appliedBy: updatedApplicants }; // Update only appliedBy field
        }
        return job;
      });
  
      setJobs(updatedJobs); // Update the state with the new job list
  
      // Find the job that was updated
      const updatedJob = updatedJobs.find((job) => job.id === jobId);
  
      // Send the entire job object with the updated appliedBy field to the server
      await axios.put(`${jobsApi}/${jobId}`, {
        ...updatedJob, // Spread the entire job object
        appliedBy: updatedJob.appliedBy, // Ensure only appliedBy is updated
      });
  
      console.log(`Applicant ${status} successfully`);
    } catch (error) {
      console.error("Error updating applicant status:", error);
    }
  };
  

  // Function to delete a job
  const deleteJob = async (jobId) => {
    try {
      const filteredJobs = jobs.filter((job) => job.id !== jobId);
      setJobs(filteredJobs);

      // Send delete request to the server
      await axios.delete(`${jobsApi}/${jobId}`);
      console.log("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Container>
      <Title>Applicants</Title>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <NoJobsMessage>No jobs posted by the company.</NoJobsMessage>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.id}>
            <JobHeader>
              <JobLogo src={job.logo} alt={job.company} />
              <JobInfo>
                <JobTitle>{job.title}</JobTitle>
                <CompanyName>{job.company}</CompanyName>
              </JobInfo>
              <DeleteButton onClick={() => deleteJob(job.id)}>
                Delete Job
              </DeleteButton>
            </JobHeader>
            <JobDetails>
              <strong>Salary:</strong> ${job.minSalary} ~ ${job.maxSalary}
            </JobDetails>
            <JobDetails>
              <strong>Location:</strong> {job.address}
            </JobDetails>
            {job.appliedBy.length === 0 ? (
              <JobDetails>
                <strong>Applicants: 0</strong>
              </JobDetails>
            ) : (
              <ApplicantsList>
                <strong>Applicants:</strong>
                {job.appliedBy.map((applicant) => (
                  <ApplicantItem key={applicant.email}>
                    <ApplicantDetails>
                      <strong>{applicant.username}</strong> <br />
                      <strong>Status: {applicant.status}</strong>
                      <br />
                      <strong>Skills: </strong>
                      {applicant.skills.join(", ")}
                      <br />
                      <strong>Email: </strong>
                      {applicant.email}<br/>
                      <strong>Education: </strong>
                      <ul>
                        {applicant.education.map((edu) => (
                          <li key={edu.id}>
                            <strong>{edu.title}</strong> at {edu.college} (
                            {edu.started} - {edu.ended || "Present"})
                            {edu.isGoing && " - Currently studying"}
                          </li>
                        ))}
                      </ul>
                      <strong>Experience: </strong>
                      <ul>
                        {applicant.experience.map((exp) => (
                          <li key={exp.id}>
                            <strong>{exp.title}</strong> at {exp.company} (
                            {exp.experience})<p>{exp.description}</p>
                          </li>
                        ))}
                      </ul>
                    </ApplicantDetails>
                    <div>
                      <StatusButton
                        className="approve"
                        onClick={() =>
                          updateApplicantStatus(
                            job.id,
                            applicant.email,
                            "Approved"
                          )
                        }
                      >
                        Approve
                      </StatusButton>
                      <StatusButton
                        className="reject"
                        onClick={() =>
                          updateApplicantStatus(
                            job.id,
                            applicant.email,
                            "Rejected"
                          )
                        }
                      >
                        Reject
                      </StatusButton>
                    </div>
                  </ApplicantItem>
                ))}
              </ApplicantsList>
            )}
          </JobCard>
        ))
      )}
    </Container>
  );
}

export default Applicants;
