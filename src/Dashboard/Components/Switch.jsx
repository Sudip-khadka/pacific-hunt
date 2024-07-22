import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  width: 50px;
  height: 25px;
  background-color: ${({ $isOn }) => ($isOn ? 'rgba(3, 190, 122, 1)' : 'rgba(175, 176, 177, 1)')};
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const SwitchButton = styled.div`
  width: 23px;
  height: 23px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: ${({ $isOn }) => ($isOn ? '24px' : '1px')};
  transition: left 0.3s;
`;

function Switch({ isOn, onToggle }) {
  const handleClick = () => {
    onToggle(!isOn);
  };

  return (
    <SwitchContainer $isOn={isOn} onClick={handleClick}>
      <SwitchButton $isOn={isOn} />
    </SwitchContainer>
  );
}

export default Switch;
