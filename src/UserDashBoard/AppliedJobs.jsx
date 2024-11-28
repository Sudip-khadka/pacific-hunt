import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const jobsApi = import.meta.env.VITE_API_JOBSEARCHING;

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

const ApplicantList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
`;

const ApplicantItem = styled.li`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0;
`;

const NoJobsMessage = styled.p`
  font-size: 1.2rem;
  color: #888;
  text-align: center;
  margin-top: 40px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  align-self: flex-start;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin: 10px;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    background-color: #ff4d4d;
    color: white;
  }

  &:last-child {
    background-color: #4caf50;
    color: white;
  }
`;

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantEmail, setApplicantEmail] = useState(null);

  useEffect(() => {
    // Fetch all jobs data
    const fetchJobs = async () => {
      try {
        const response = await axios.get(jobsApi);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Get the logged-in user's email from localStorage
    const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

    if (userEmail) {
      // Filter jobs where the user has applied
      const filteredJobs = jobs
        .map((job) => ({
          ...job,
          appliedBy: job.appliedBy.filter((applicant) => applicant.email === userEmail),
        }))
        .filter((job) => job.appliedBy.length > 0);

      setAppliedJobs(filteredJobs);
    }
  }, [jobs]);

  const withdrawApplication = async () => {
    try {
      const jobToUpdate = jobs.find((job) => job.id === selectedJob);

      if (jobToUpdate) {
        const updatedAppliedBy = jobToUpdate.appliedBy.filter(
          (applicant) => applicant.email !== applicantEmail
        );

        const updatedJobs = jobs.map((job) =>
          job.id === selectedJob ? { ...job, appliedBy: updatedAppliedBy } : job
        );
        setJobs(updatedJobs);

        const updatedAppliedJobs = appliedJobs.map((job) =>
          job.id === selectedJob ? { ...job, appliedBy: updatedAppliedBy } : job
        );
        setAppliedJobs(updatedAppliedJobs);

        await axios.put(`${jobsApi}/${selectedJob}`, {
          ...jobToUpdate,
          appliedBy: updatedAppliedBy,
        });

        console.log("Application withdrawn successfully");
      }

      setIsModalVisible(false);
    } catch (error) {
      console.error("Error withdrawing application:", error);
    }
  };

  const openConfirmationModal = (jobId, email) => {
    setSelectedJob(jobId);
    setApplicantEmail(email);
    setIsModalVisible(true);
  };

  const closeConfirmationModal = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
    setApplicantEmail(null);
  };

  return (
    <Container>
      <Title>Applied Jobs</Title>
      {appliedJobs.length === 0 ? (
        <NoJobsMessage>No jobs applied for yet.</NoJobsMessage>
      ) : (
        appliedJobs.map((job) => (
          <JobCard key={job.id}>
            <JobHeader>
              <JobLogo src={job.logo} alt={job.company} />
              <JobInfo>
                <JobTitle>{job.title}</JobTitle>
                <CompanyName>{job.company}</CompanyName>
              </JobInfo>
            </JobHeader>
            <JobDetails>
              <strong>Salary:</strong> ${job.minSalary} ~ ${job.maxSalary}
            </JobDetails>
            <JobDetails>
              <strong>Location:</strong> {job.address}
            </JobDetails>
            <JobDetails>
              <strong>Skills:</strong> {job.skills}
            </JobDetails>
            <JobDetails>
              <strong>Applicants:</strong>
            </JobDetails>
            <ApplicantList>
              {job.appliedBy.map((applicant) => (
                <ApplicantItem key={applicant.id}>
                  <strong>{applicant.username}</strong> ({applicant.email}) -{" "}
                  <span>Status: {applicant.status}</span>
                  <br />
                  <DeleteButton
                    onClick={() => openConfirmationModal(job.id, applicant.email)}
                  >
                    Withdraw Application
                  </DeleteButton>
                </ApplicantItem>
              ))}
            </ApplicantList>
          </JobCard>
        ))
      )}

      <ConfirmationModal visible={isModalVisible}>
        <ModalContent>
          <h3>Are you sure you want to withdraw your application?</h3>
          <ModalButton onClick={withdrawApplication}>Yes, Withdraw</ModalButton>
          <ModalButton onClick={closeConfirmationModal}>Cancel</ModalButton>
        </ModalContent>
      </ConfirmationModal>
    </Container>
  );
}

export default AppliedJobs;
