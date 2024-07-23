import React from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { RiDownloadCloud2Line } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

const StyledButton = styled.button`
  width: ${(props) => (props.width ? props.width : '215px')};
  display: flex;
  height: 48px;
  padding: 14px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: var(--Primary-500, #01a3e0);
`;

function Button({ width, title, onClick, iconType, filePath }) {
  let icon;
  
  switch (iconType) {
    case 'download':
      icon = <RiDownloadCloud2Line />;
      break;
    case 'delete':
      icon = <MdDelete />;
      break;
    case 'upload':
      icon = <FiUploadCloud />;
      break;
    case 'create':
      icon = <FaPlus />;
      break;
    default:
      icon = null;
  }
  
  return filePath ? (
    <StyledButton as="a" href={filePath} download width={width}>
      {icon && icon}
      {title}
    </StyledButton>
  ) : (
    <StyledButton width={width} onClick={onClick}>
      {icon && icon}
      {title}
    </StyledButton>
  );
}

export default Button;