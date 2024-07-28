import React from "react";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import Category from "./Configurations/Category";
import UnderConstruction from '../UnderConstruction'
import Profession from "./Configurations/Profession";
import CompanyType from "./Configurations/CompanyType";
import SocialMedia from "./Configurations/SocialMedia";
import JobType from "./Configurations/JobType";
import Skills from "./Configurations/Skills";

const ConfigurationContainer = styled.div`
  margin-left: 264px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ConfigurationTitle = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
const Title = styled.h1`
  color: var(--Neutral-Grey-900, #3c3d3d);
  margin: 0px;
  /* Headings/Medium/Bold */
  font-family: "Be Vietnam Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.48px;
`;
const Caption = styled.div`
  color: var(--Neutral-Grey-500, #6b6d6f);

  /* Title/Medium/Regular */
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const ConfigurationBody = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  align-content: flex-start;
  gap: 20px 24px;
  flex-wrap: wrap;
`;

const ConfigurationCard = styled.div`
  display: flex;
  width: 340px;
  height: 78px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--Neutral-White, #fff);
  color: var(--Neutral-Grey-900, #3c3d3d);
  &:hover {
    background-color:#DEF3FF;
    color:#04334D;
  }
`;

const ConfigurationItem = styled(Link)`
  display: flex;
  width: 312px;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  text-decoration: none;
`;
const ButtonTitle = styled.p`
  text-align: center;

  /* Title/Medium/Semibold */
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
 
`;

const configurations = [
  {
    id: 1,
    title: "Categories",
    link: "/dashboard/configurations/category"
  },
  {
    id: 2,
    title: "Profession",
    link: "/dashboard/configurations/profession"
  },
  {
    id: 3,
    title: "Company Type",
    link: "/dashboard/configurations/company-type"
  },
  {
    id: 4,
    title: "Skill",
    link: "/dashboard/configurations/skill"
  },
  {
    id: 5,
    title: "Social Media",
    link: "/dashboard/configurations/social-media"
  },
  {
    id: 6,
    title: "Job Type",
    link: "/dashboard/configurations/job-type"
  },
  {
    id: 7,
    title: "Company Type",
    link: "/dashboard/configurations/company-type"
  },
  {
    id: 8,
    title: "Education Level",
    link: "/dashboard/configurations/education-level"
  },
  {
    id: 9,
    title: "Experience Level",
    link: "/dashboard/configurations/experience-level"
  },
  {
    id: 10,
    title: "Work Location",
    link: "/dashboard/configurations/work-location"
  },
];

function Configurations() {
  return (
    <ConfigurationContainer>
      <ConfigurationTitle>
        <Title>Configurations</Title>
        <Caption>Configure details from here.</Caption>
      </ConfigurationTitle>
      <div className="configuration-routes">
        <Routes>
          <Route
            path="/"
            element={
              <ConfigurationBody>
                {configurations.map((data) => (
                  <ConfigurationCard key={data.id}>
                    <ConfigurationItem to={data.link}>
                      <ButtonTitle>{data.title}</ButtonTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2.62614 12C2.62614 12.2984 2.74467 12.5845 2.95565 12.7955C3.16663 13.0065 3.45278 13.125 3.75114 13.125H17.5324L12.7043 17.9531C12.5994 18.0576 12.5162 18.1818 12.4594 18.3186C12.4026 18.4553 12.3734 18.6019 12.3734 18.75C12.3734 18.8981 12.4026 19.0447 12.4594 19.1814C12.5162 19.3182 12.5994 19.4424 12.7043 19.5469C12.9166 19.7564 13.2029 19.8739 13.5011 19.8739C13.7994 19.8739 14.0857 19.7564 14.298 19.5469L21.048 12.7969C21.1529 12.6924 21.2361 12.5682 21.2929 12.4314C21.3497 12.2947 21.3789 12.1481 21.3789 12C21.3789 11.8519 21.3497 11.7053 21.2929 11.5686C21.2361 11.4318 21.1529 11.3076 21.048 11.2031L14.298 4.45312C14.0867 4.24178 13.8 4.12305 13.5011 4.12305C13.3532 4.12305 13.2066 4.1522 13.0699 4.20883C12.9332 4.26547 12.8089 4.34848 12.7043 4.45312C12.5996 4.55777 12.5166 4.682 12.46 4.81873C12.4033 4.95546 12.3742 5.10201 12.3742 5.25C12.3742 5.39799 12.4033 5.54454 12.46 5.68126C12.5166 5.81799 12.5996 5.94223 12.7043 6.04687L17.5324 10.875H3.75114C3.45278 10.875 3.16663 10.9935 2.95565 11.2045C2.74467 11.4155 2.62614 11.7016 2.62614 12Z"
                          fill="#3C3D3D"
                        />
                      </svg>
                    </ConfigurationItem>
                  </ConfigurationCard>
                ))}
              </ConfigurationBody>
            }
          />
          <Route path="/category" element={<Category />} />
          <Route path="/profession" element={<Profession/>} />
          <Route path="/company-type" element={<CompanyType/>} />
          <Route path="/skill" element={<Skills />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/job-type" element={<JobType />} />
          <Route path="/company-type" element={<UnderConstruction />} />
          <Route path="/education-level" element={<UnderConstruction />} />
          <Route path="/experience-level" element={<UnderConstruction />} />
          <Route path="/work-location" element={<UnderConstruction />} />
          {/* Add routes for other configuration pages */}
        </Routes>
      </div>
    </ConfigurationContainer>
  );
}

export default Configurations;
