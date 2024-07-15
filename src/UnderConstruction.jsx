import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './assets/404Error/underconstruction.svg';
import announcement from './assets/404Error/announcement.svg';
import working from './assets/404Error/working.svg';
import styled from 'styled-components';

const UnderConstructionContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: left;
  color: #04334D;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(4, 51, 77, 0.5); /* #04334D with 50% opacity */
    z-index: 1;
  }

  /* Ensuring the content of the div is above the overlay */
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const Announcement = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  left: 150px;
  display: flex;
  align-items: end;
  img {
    height: 90%;
    width: 100%;
  }
  .working {
    height: 30%;
    position: absolute;
    top: 25%;
    left: -14%;
  }
`;

const Title = styled.h1`
  position: absolute;
  z-index: 10;
  top: 15%;
  left: 38%;
  font-weight: 700;
  color: red;
`;

const Description = styled.p`
  position: absolute;
  text-align: right;
  z-index: 10;
  width: 280px;
  font-weight: 600;
  line-space: 20px;
  font-size: 16px;
  top: 28%;
  left: 42%;
`;

const BackButton = styled.button`
  position: absolute;
  z-index: 10;
  top: 5%;
  left:2%;
  padding: 10px 20px;
  background-color: #04334D;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 8px;
  }
`;

function UnderConstruction() {
  const navigate = useNavigate();

  return (
    <UnderConstructionContainer backgroundImage={backgroundImage}>
      <Announcement>
        <img src={announcement} alt="announcement bar" />
        <Title>Danger Zone !</Title>
        <Description>This Page Is Under Construction. We Will Let You Know Once Completed<br/>
          <span className='italic text-2xl'>- Sudip Khadka</span>
        </Description>
        <img className='working' src={working} alt="working person" />
      </Announcement>
      <BackButton onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14 18l-6-6 6-6"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Return Back
      </BackButton>
    </UnderConstructionContainer>
  );
}

export default UnderConstruction;
