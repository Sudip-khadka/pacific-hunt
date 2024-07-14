import React from 'react'
import styled from 'styled-components'
import google from '../assets/companies/google.svg'
import zoho from '../assets/companies/zoho.png'
import airbnb from '../assets/companies/airbnb.png'
import microsoft from '../assets/companies/microsoft.png'
import pickup from '../assets/companies/pickup.png'

const Brand = styled.div`
width:100%;
display: inline-flex;
flex-direction:column;
padding: 80px 112px;
gap:56px;
justify-content: center;
align-items: center;
background: var(--Neutral-Grey-50, #F5F6F6);
h1{
color: var(--Neutral-Grey-900, #3C3D3D);
text-align: center;

/* Headings/Medium/Semibold */
font-family: "Be Vietnam Pro";
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 32px; /* 133.333% */
letter-spacing: -0.48px;}`

function Branding() {
  return (
    <Brand>
    <h1 className='m-0'>Join in globally <span className='text-[#01A3E0]'>renowned</span> companies</h1>
    <div className="image-container flex overflow-x-auto gap-[67px] h-[52px]">
        <img src={google} alt="google image" />
        <img src={zoho} alt="zoho image" />
        <img src={airbnb} alt="airbng image" />
        <img src={microsoft} alt="microsoft image" />
        <img src={pickup} alt="pickup image" />
    </div>
    </Brand>
  )
}

export default Branding
