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
    background-color: ${(props) => (props.primary== "primary" ? '#0056b3' : '#DEF3FF')};
  }
`;

// Primary button styles
const primaryStyles = css`
  background: var(--Primary-500, #01A3E0);
`;

// Secondary button styles
const secondaryStyles = css`
  border: 1px solid var(--Primary-500, #01A3E0);
  color:var(--Primary-500, #01A3E0);
  background:transparent;
`;

const StyledButton = styled.button`
  ${sharedStyles}
  ${(props) => (props.primary== "primary" ? primaryStyles : secondaryStyles)}
  width: ${(props) => props.width || (props.primary ? '155px' : '130px')};
`;

const Button = ({ text, primary,width,onClick }) => {
  return <StyledButton primary={primary} width={width} onClick={onClick}>{text}</StyledButton>;
};

export default Button;
