import React from 'react';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

// Styled Button
const StyledButton = styled.button`
  background-color: red; /* Red background */
  padding:14px 24px;
  color: white; /* White icon color */
  height: 48px; /* Height of 48px */
  border: none; /* Remove default button border */
  border-radius: 4px; /* Optional: add border radius */
  display: flex;
  align-items: center;
  gap:8px;
  justify-content: center;
  cursor: pointer; /* Change cursor to pointer */
  &:hover {
    background-color: darkred; /* Darker red on hover */
  }
  &:focus {
    outline: none; /* Remove default focus outline */
  }
`;

function DeleteBtn({onClick,number}) {
  return (
    <StyledButton onClick={onClick}>
      <FaTrash />Delete {`${number ? "("+ number+")":"" }`} 
    </StyledButton>
  );
}

export default DeleteBtn;
