import React from 'react';
import styled, { css } from 'styled-components';

// Shared styles
const sharedStyles = css`
  display: flex;
  height: 48px;
  padding: 14px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: #FFF;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#5a6268')};
  }
`;

// Primary button styles
const primaryStyles = css`
  width: 155px;
  background: var(--Primary-500, #01A3E0);
`;

// Secondary button styles
const secondaryStyles = css`
  width: 110px;
  border: 1px solid var(--Primary-500, #01A3E0);
  color:var(--Primary-500, #01A3E0);
  background:transparent;
`;

const StyledButton = styled.button`
  ${sharedStyles}
  ${(props) => (props.primary ? primaryStyles : secondaryStyles)}
`;

const Button = ({ text, primary }) => {
  return <StyledButton primary={primary}>{text}</StyledButton>;
};

export default Button;
