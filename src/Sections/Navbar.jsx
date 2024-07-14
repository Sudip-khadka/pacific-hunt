import React, { useState } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import Button from "../Components/Button";

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
  z-index: 10;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 32px;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.isActive ? '600' : '400')};
  color: ${(props) => (props.isActive ? "#01A3E0" : '#3c3d3d')};
  line-height: 24px;
  cursor: pointer;

  &:hover {
    color: #01A3E0;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0%;
    bottom: -2px;
    width: ${(props) => (props.isActive ? '25px' : '0')};
    height: 3px;
    background-color: #01A3E0;
    transition: width 0.3s, height 0.3s;
  }
`;

const Navbar = () => {
  const [activePage, setActivePage] = useState("Home");

  const handleNavItemClick = (pageName) => {
    setActivePage(pageName);
  };

  return (
    <Navigation>
      <Logo>
        <img src={logo} alt="Pacific Hunt logo" />
      </Logo>
      <div className="navigations flex gap-32 items-center">
        <NavItems>
          <NavItem
            isActive={activePage === "Home"}
            onClick={() => handleNavItemClick("Home")}
          >
            <a href="#">Home</a>
          </NavItem>
          <NavItem
            isActive={activePage === "Jobs"}
            onClick={() => handleNavItemClick("Jobs")}
          >
            <a href="#jobs">Jobs</a>
          </NavItem>
          <NavItem
            isActive={activePage === "Companies"}
            onClick={() => handleNavItemClick("Companies")}
          >
            <a href="#companies">Companies</a>
          </NavItem>
          <NavItem
            isActive={activePage === "AboutUs"}
            onClick={() => handleNavItemClick("AboutUs")}
          >
            <a href="#aboutUs">About Us</a>
          </NavItem>
        </NavItems>
        <div className="buttons flex gap-16">
          <Button text="Sign Up" />
          <Button text="Post a Job" primary="primary" />
        </div>
      </div>
    </Navigation>
  );
};

export default Navbar;
