import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const JobApi = import.meta.env.VITE_API_JOBSEARCHING;

// Styled Components
const Container = styled.div`
   margin-left: 264px;
  padding: 20px;

  @media (max-width: 768px) {
    margin: 0;
    padding: 10px;
  }

  overflow-x: auto;
`;

const JobCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  background-color: #f9f9f9;
`;

const JobTitle = styled.h3`
  margin: 0 0 10px;
`;

const JobDetails = styled.p`
  margin: 5px 0;
  color: #555;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #d9363e;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${(props) =>
    props.confirm
      ? `
    background-color: #ff4d4f;
    color: white;
    &:hover {
      background-color: #d9363e;
    }
  `
      : `
    background-color: #ccc;
    color: black;
    &:hover {
      background-color: #bbb;
    }
  `}
`;

const PostedJob = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(JobApi);
        setJobs(response.data);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs by company email
  useEffect(() => {
    const companyDetails = JSON.parse(localStorage.getItem('employeerDetail'));
    const companyEmail = companyDetails?.companyEmail || '';

    if (companyEmail) {
      const filtered = jobs.filter((job) => job.email === companyEmail);
      setFilteredJobs(filtered);
    }
  }, [jobs]);

  // Handle job deletion
  const handleDelete = async () => {
    if (!selectedJob) return;

    try {
      await axios.delete(`${JobApi}/${selectedJob.id}`);
      alert('Job deleted successfully!');
      setFilteredJobs((prevJobs) => prevJobs.filter((job) => job.id !== selectedJob.id));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete the job.');
    } finally {
      setIsModalOpen(false);
      setSelectedJob(null);
    }
  };

  const confirmDelete = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  if (!filteredJobs.length) {
    return <Container>No jobs found for this company.</Container>;
  }

  return (
    <Container>
      <h2>Posted Jobs</h2>
      {filteredJobs.map((job) => (
        <JobCard key={job.id}>
          <JobTitle>{job.title}</JobTitle>
          <JobDetails><strong>Company:</strong> {job.company}</JobDetails>
          <JobDetails><strong>Email:</strong> {job.email}</JobDetails>
          <JobDetails><strong>Salary:</strong> ${job.minSalary} ~ ${job.maxSalary}</JobDetails>
          <JobDetails><strong>Location:</strong> {job.address}</JobDetails>
          <JobDetails><strong>Skills:</strong> {job.skills}</JobDetails>
          <JobDetails><strong>Description:</strong> {job.description}</JobDetails>
          <JobDetails><strong>Applicants:</strong> {job.appliedBy.length || 0}</JobDetails>
          <DeleteButton onClick={() => confirmDelete(job)}>Delete</DeleteButton>
        </JobCard>
      ))}

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this job?</h3>
            <ModalButton confirm onClick={handleDelete}>
              Yes, Delete
            </ModalButton>
            <ModalButton onClick={closeModal}>Cancel</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default PostedJob;
