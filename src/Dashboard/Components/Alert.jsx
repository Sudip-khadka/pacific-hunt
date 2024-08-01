import React from 'react';
import styled from 'styled-components';
import { FaCircleCheck } from "react-icons/fa6";

const AlertContainer = styled.div`
display: flex;
height: 32px;
padding: 14px 24px;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 4px;
border: 1px solid var(--Success-500, #03BE7A);
background: var(--Success-100, #CEFDE3);
  color: var(--Success-500, #03BE7A);
text-align: center;

/* Title/Small/Medium */
font-family: "Be Vietnam Pro";
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 142.857% */
 @media (max-width: 768px) {
    height: auto; /* Adjust height for small devices */
    width: 90%; /* Make width responsive */
    max-width: 400px; /* Set a maximum width */
  }
`;

const Alert = ({ message, }) => {
  return <AlertContainer >{message} <FaCircleCheck/></AlertContainer>;
};

export default Alert;
