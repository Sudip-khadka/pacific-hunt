import React from 'react'
import styled from 'styled-components'
import Button from '../Components/Button'
import WhyJoinUs from '../assets/whyjoinus.png'
import { NavLink } from 'react-router-dom'

const JoinContainer = styled.div`
width: 100%;
padding:167px 70px 112px 70px;
height: 647px;
@media (max-width:768px){
padding:20px;
height:460px;}`

const JoinUsWrapper = styled.div`
border-radius: 12px;
background: var(--Primary-950, #04334D);
width: 100%;
height: 368px;
flex-shrink: 0;
padding:56px 80px;
position:relative;
img{
position:absolute;
bottom:0px;
right:56px}
@media (max-width:768px){
padding:20px;
height:100%;
img{
right:0px;
z-index:1;}
}
`

const Title=styled.h1`
color: var(--Primary-50, #EFFAFF);

/* Headings/Medium/Semibold */
font-family: "Be Vietnam Pro";
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 32px; /* 133.333% */
letter-spacing: -0.48px;
margin-bottom:32px;
z-index:10;
position:relative;
@media (max-width:768px){
  margin-bottom:16px;
}
`
const PacificHunt =styled.span`
color: var(--Primary-500, #01A3E0);

/* Headings/Medium/Semibold */
font-family: "Be Vietnam Pro";
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 32px;
letter-spacing: -0.48px;`

const WhyJoinUS = styled.p`
max-width: 592px;
z-index:10;
position:relative;
color: var(--Neutral-Grey-100, #E6E7E7);

/* Body/Large/Regular */
font-family: "Be Vietnam Pro";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
`
const ButtonWrapper = styled.div`
position:relative;
display: inline-flex;
align-items: flex-start;
gap: 24px;
z-index:10;
margin-top:48px;
  @media (max-width:768px){
    margin-top:24px;
align-items:center;
flex-direction:column;}`
function JoinUs() {
  return (
    <JoinContainer>
        <JoinUsWrapper>
            <Title>Join <PacificHunt>Pacific Hunt </PacificHunt>today. Connect, Grow, Succeed.</Title>
            <WhyJoinUS>Whether you're seeking your next career move or searching for top talent, our platform offers the perfect avenue to connect and thrive.</WhyJoinUS>
            <ButtonWrapper>
            <NavLink to='/jobseekerlogin'>
                <Button text="Join As Jobseeker" primary="primary" width="176px"/>
</NavLink>
<NavLink to='/employeerlogin'>   <Button text="Join As Employer" width="176px" /></NavLink>
            </ButtonWrapper>
            <img src={WhyJoinUs} alt="person looking for jobs in his laptop" />
        </JoinUsWrapper>
    </JoinContainer>
  )
}

export default JoinUs
