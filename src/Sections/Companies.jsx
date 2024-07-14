import React from 'react'
import styled from 'styled-components';
import { FaArrowRightLong } from 'react-icons/fa6';
import google from '../assets/Logos/google.png'
import apple from '../assets/Logos/apple.png'
import facebook from '../assets/Logos/facebook.png'
import skype from '../assets/Logos/logos_skype.png'
import prabodh from '../assets/Logos/prabodh.png'
import twitter from '../assets/Logos/twitter.svg'
import { IoLocationOutline } from 'react-icons/io5';

const CompaniesContainer = styled.div`
  padding: 50px 70px 96px;
  width: 100%;
`;

const CompaniesHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
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

const SeeMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
  border-radius: 4px;
  color: var(--Primary-500, #01A3E0);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--Primary-100, #E0F7FA);
    color: var(--Primary-700, #007B9E);
  }

  p {
    margin: 0;
  }
`;
const CompanyCard=styled.div`
display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 32px;
  .company{
    padding:24px 24px 32px;
border-radius: 12px;
border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
background: var(--Neutral-White, #FFF);}`
const ImageContainer = styled.div`
padding:8px;
border-radius: 50%;
border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
background: var(--Neutral-White, #FFF);
img{
width:32px;
height:32px;}`

const AvailableJobs = styled.div`
display: inline-flex;
height: 36px;
padding: 12px 16px;
justify-content: center;
align-items: center;
gap: 8px;
flex-shrink: 0;
border-radius: 30px;
border: 1px solid var(--Primary-500, #01A3E0);
background: var(--Primary-50, #EFFAFF);
color: var(--Primary-700, #0072AA);
text-align: center;

/* Title/Medium/Regular */
font-family: "Be Vietnam Pro";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */`

const CompanyTitle = styled.div`
color: var(--Neutral-Grey-900, #3C3D3D);

/* Title/Large/Semibold */
font-family: "Be Vietnam Pro";
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 24px; /* 133.333% */
`
const CompanyLocation = styled.div`
display:flex;
align-items:center;
gap:4px;
color: var(--Neutral-Grey-500, #6B6D6F);

/* Title/Small/Regular */
font-family: "Be Vietnam Pro";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */`

const Tag = styled.div`
display: flex;
height: 36px;
padding: 12px 16px;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 30px;
border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
`

const companies = [
    {
        id:1,
        title:"Google",
        location:"Perth, Australia",
        logo:google,
        jobs:50,
        tags:["Information Technology","Fintech"]
    },
    {
        id:2,
        title:"Prabodh Digital Production",
        location:"Perth, Australia",
        logo:prabodh,
        jobs:222,
        tags:["Information Technology","Fintech"]
    },
    {
        id:3,
        title:"Skype",
        location:"Perth, Australia",
        logo:skype,
        jobs:115,
        tags:["Information Technology","Fintech"]
    },
    {
        id:4,
        title:"Facebook",
        location:"Perth, Australia",
        logo:facebook,
        jobs:97,
        tags:["Information Technology","Fintech"]
    },
    {
        id:5,
        title:"Apple",
        location:"Perth, Australia",
        logo:apple,
        jobs:130,
        tags:["Information Technology","Fintech"]
    },
    {
        id:6,
        title:"Twitter",
        location:"Perth, Australia",
        logo:twitter,
        jobs:80,
        tags:["Information Technology","Fintech"]
    },
]

function Companies() {
  return (
    <CompaniesContainer id='companies'>
      <CompaniesHeader>
        <Title>Featured Companies</Title>
        <SeeMoreButton>
          <p>See More</p>
          <FaArrowRightLong />
        </SeeMoreButton>
      </CompaniesHeader>
      <CompanyCard>
        {companies.map((company,index)=>(
            <div key={index} className="company flex flex-col gap-6">
                <div className="logoandjobs flex justify-between">
                    <ImageContainer>
                        <img src={company.logo} alt={`${company.title} logo`} />
                    </ImageContainer>
                    <AvailableJobs>{company.jobs} jobs available</AvailableJobs>
                </div>
                <div className="titleandlocation flex flex-col gap-2">
                    <CompanyTitle>{company.title}</CompanyTitle>
<CompanyLocation><IoLocationOutline/> {company.location}</CompanyLocation>
                </div>
                <div className="companytags flex gap-3">
                    {company.tags.map(tag=>(
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>
            </div>
        ))}
      </CompanyCard>
      </CompaniesContainer>
  )
}

export default Companies
