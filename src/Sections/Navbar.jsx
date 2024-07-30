import React, { useState } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import Button from "../Components/Button";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navigation = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 112px;
  background: #FFF;
  box-shadow: 0px 1px 0px 0px #E5E9F2;
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  z-index: 1000;
  transition: width 0.3s ease;
  @media (max-width: 768px) {
  
    height: ${props => (props.isNavOpen ? '100%' : '15%')};
    width: ${props => (props.isNavOpen ? '40%' : '10%')};
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    background: #FFF; /* Ensure background covers entire width */
    box-shadow: none; /* Optional: remove box-shadow on mobile */
  }
     @media (max-width: 500px) {
     padding:4px;
     }
`;

const MenuIcon = styled.div`
  font-size: 30px;
  cursor: pointer;
  display:none;
  z-index: 15; /* Ensure it's above other elements */
  @media (max-width: 768px) {
    display: ${props => (props.isNavOpen ? 'none' : 'block')};
  }
`;

const CloseIcon = styled.div`
  display: none;
  font-size: 30px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: ${props => (props.isNavOpen ? 'block' : 'none')};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px; /* Space between logo and menu items */
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 32px;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    display: ${props => (props.isNavOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    gap: 16px;
    padding: 16px 0;
  }
`;

const NavItem = styled.li`
  position: relative;
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.isactive ? '600' : '400')};
  color: ${(props) => (props.isactive ? "#01A3E0" : '#3c3d3d')};
  line-height: 24px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%;
    &::after {
    content: '';
    position: absolute;
    left: 50%;
    }
  }

  &:hover {
    color: #01A3E0;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0%;
    bottom: -2px;
    width: ${(props) => (props.isactive ? '25px' : '0')};
    height: 3px;
    background-color: #01A3E0;
    transition: width 0.3s, height 0.3s;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 768px) {
    display: ${props => (props.isNavOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items:left;
    width: 100%;
    margin-top: auto; /* Align buttons at the bottom */
  }
`;

const Navbar = () => {
  const [activePage, setActivePage] = useState("Home");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavItemClick = (pageName) => {
    setActivePage(pageName);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Navigation isNavOpen={isNavOpen}>
      <Logo>
        <NavLink to='/'> <img src={logo} alt="Pacific Hunt logo" /></NavLink>
        <MenuIcon isNavOpen={isNavOpen} onClick={toggleNav}>
          <IoMenu />
        </MenuIcon>
        <CloseIcon isNavOpen={isNavOpen} onClick={toggleNav}>
          <IoClose />
        </CloseIcon>
      </Logo>
      <NavItems isNavOpen={isNavOpen}>
        <NavItem
          isactive={activePage === "Home"}
          onClick={() => handleNavItemClick("Home")}
        >
          <a href="#">Home</a>
        </NavItem>
        <NavItem
          isactive={activePage === "Jobs"}
          onClick={() => handleNavItemClick("Jobs")}
        >
          <a href="#jobs">Jobs</a>
        </NavItem>
        <NavItem
          isactive={activePage === "Companies"}
          onClick={() => handleNavItemClick("Companies")}
        >
          <a href="#companies">Companies</a>
        </NavItem>
        <NavItem
          isactive={activePage === "AboutUs"}
          onClick={() => handleNavItemClick("AboutUs")}
        >
          <a href="#aboutUs">About Us</a>
        </NavItem>
      </NavItems>
      <ButtonsContainer isNavOpen={isNavOpen}>
        <NavLink to='/jobseekerlogin'>
          <Button text="Sign Up" />
        </NavLink>
        <NavLink to='/employeerlogin'>
          <Button text="Post a Job" primary="primary" />
        </NavLink>
      </ButtonsContainer>
    </Navigation>
  );
};

export default Navbar;
