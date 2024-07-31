import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowRightLong } from "react-icons/fa6";
import BatmanLogo from "../assets/Logos/Batman.png";
import GoogleLogo from "../assets/Logos/flat-color-icons_google.svg";
import TeslaLogo from "../assets/Logos/Tesla.png";
import Button from "../Components/Button";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import jobs from "../Datas/Jobs";

const JobsContainer = styled.div`
  padding: 50px 112px 50px;
  width: 100%;
  @media (max-width:768px){
  padding:25px;}
`;
const JobsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
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

const SeeMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border: 1px solid var(--Neutral-Grey-100, #e6e7e7);
  border-radius: 4px;
  color: var(--Primary-500, #01a3e0);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--Primary-100, #e0f7fa);
    color: var(--Primary-700, #007b9e);
  }

  p {
    margin: 0;
  }
`;
const JobsBody = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 32px;
  @media (max-width: 768px) {
    gap: 12px 16px;
    grid-template-columns: repeat(2, 1fr);
  }
    @media (max-width: 650px) {
      grid-template-columns: repeat(1, 1fr);
    }
`;
const JobCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  align-items: left;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid var(--Neutral-Grey-100, #e6e7e7);
  background: var(--Neutral-White, #fff);
  @media (max-width: 768px) {
    padding: 12px;
    gap: 8px;
  }
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
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const JobBody = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
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

    /* Title/Small/Regular */
    font-family: "Be Vietnam Pro";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;
const JobFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Jobs() {
  const [jobsNumber, setJobsNumber] = useState(6);
  const increaseJobs = () => {
    setJobsNumber((prev) => prev + 6);
  };
  return (
    <JobsContainer id="jobs">
      <JobsHeader>
        <Title>Top Jobs Openings</Title>
        <SeeMoreButton>
          <p onClick={increaseJobs}>See More</p>
          <FaArrowRightLong />
        </SeeMoreButton>
      </JobsHeader>
      <JobsBody>
        {jobs.slice(0, jobsNumber).map((job) => (
          <JobCard key={job.id}>
            <JobHeader>
              <img src={job.logo} alt={`${job.company} logo`} />
              <Button text="Apply Now" />
            </JobHeader>
            <JobBody>
              <div className="upper">
                <JobTitle>{job.title}</JobTitle>
                <div className="locationandexpiration flex gap-4 ">
                  <div className="location flex gap-1 items-center ">
                    <IoLocationOutline /> {job.location}
                  </div>
                  <div className="expiration flex gap-1 items-center ">
                    <CiClock2 /> Expires In {job.expiration} Days
                  </div>
                </div>
              </div>
              <div className="lower">
                <div className="tags flex gap-4">
                  {job.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-base lg:text-lg sm:text-sm"
                    >
                      {tag}
                      {index < 2 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                        >
                          <circle cx="3" cy="3" r="3" fill="#86888A" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                <div className="salary sm:text-sm">{job.salary}</div>
              </div>
            </JobBody>
            <hr />
            <JobFooter>
              <div className="company font-medium">{job.company}</div>
              <div className="saved">
                {job.saved ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M8.06058 27.4026C7.40071 27.6854 6.66666 27.2014 6.66666 26.4835V6.66667C6.66666 5.93333 6.92799 5.30533 7.45066 4.78267C7.97243 4.26089 8.59999 4 9.33332 4H22.6667C23.4 4 24.028 4.26089 24.5507 4.78267C25.0724 5.30533 25.3333 5.93333 25.3333 6.66667V26.4835C25.3333 27.2014 24.5993 27.6854 23.9394 27.4026L16 24L8.06058 27.4026Z"
                      fill="#0072AA"
                    />
                    <path
                      d="M8.06058 27.4026C7.40071 27.6854 6.66666 27.2014 6.66666 26.4835V6.66667C6.66666 5.93333 6.92799 5.30533 7.45066 4.78267C7.97243 4.26089 8.59999 4 9.33332 4H22.6667C23.4 4 24.028 4.26089 24.5507 4.78267C25.0724 5.30533 25.3333 5.93333 25.3333 6.66667V26.4835C25.3333 27.2014 24.5993 27.6854 23.9394 27.4026L16 24L8.06058 27.4026Z"
                      stroke="#0072AA"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M16.3939 23.0809L16 22.912L15.6061 23.0809L7.66666 26.4835L7.66666 6.66667C7.66666 6.20091 7.82096 5.82658 8.15776 5.48977C8.49332 5.15422 8.86706 5 9.33332 5H22.6667C23.1327 5 23.507 5.15409 23.8436 5.48977C24.1792 5.82629 24.3333 6.20064 24.3333 6.66667V26.4835L16.3939 23.0809Z"
                      stroke="#AFB0B1"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </div>
            </JobFooter>
          </JobCard>
        ))}
      </JobsBody>
    </JobsContainer>
  );
}

export default Jobs;
