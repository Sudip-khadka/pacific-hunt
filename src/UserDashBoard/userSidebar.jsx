import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/logofooter.png";
import { IoPersonCircle } from "react-icons/io5";
import ConfirmationDialog from '../Components/ConfirmationDialog';
import { AiOutlineUser, AiFillCrown } from 'react-icons/ai';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
const Sidebar = styled.div`
  display: flex;
  width: 264px;
  height: 1284px;
  padding: 32px 0px 660px 0px;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  flex-shrink: 0;
  background: var(--Primary-950, #04334d);
  position: absolute;
  top: 0px;
  @media (max-width: 768px) {
  position:fixed
  z-index: 1000;
    height: ${props => (props.isNavOpen ? '100vh' : '80px')};
    width: ${props => (props.isNavOpen ? '60%' : '80px')};
    padding: 25px;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    background: ${props => (props.isNavOpen ? '#04334d' : 'transparent')}; /* Ensure background covers entire width */
    box-shadow: none; /* Optional: remove box-shadow on mobile */
  }
`;

const MenuIcon = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
  font-size: 40px;
  cursor: pointer;
  color:white;
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
  color:white;
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
const LogoContainer = styled.div`
@media(max-width:768px){
  display: ${props => (props.isNavOpen ? 'block' : 'none')};
  }
`;
const SideNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 200px;
  color: rgba(239, 250, 255, 1);
  @media(max-width:768px){
  gap:100px;}
`;
const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;


const LogoutContainer = styled.button`
  display: flex;
  width: 264px;
  height: 56px;
  padding-left: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  .logout {
    display: flex;
    width: 248px;
    align-items: center;
    gap: 16px;
  }
`;
const StyledNavLink = styled(NavLink)`
  display: flex;
  width: 264px;
  height: 56px;
  padding-left: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  color: rgba(239, 250, 255, 1);
  text-decoration: none;
  position: relative;

  &.active {
  color: var(--Primary-500, #01A3E0);
  background: var(--Primary-50, #EFFAFF);
   svg path {
      fill: var(--Primary-500, #01A3E0);
    }

        &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 6px;
      height: 56px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='56' viewBox='0 0 6 56' fill='none'%3E%3Cpath d='M4.42229 0.788855L6 0V56L5.47018 55.8234C2.20344 54.7345 0 51.6774 0 48.2339V7.94427C0 4.91409 1.71202 2.14399 4.42229 0.788855Z' fill='%2301A3E0'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right center;
    }
  }
  }

  .StyledNavLink {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .StyledNavLink > .text {
    width: 150px;
  }
`;


const DropdownMenu = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')}; /* Toggle dropdown visibility */
  width:264px;
`;

function userSidebar() {
  const navigate = useNavigate();
    const location = useLocation();
    const [isNavOpen,setIsNavOpen]= useState(false);
  const [showConfirmation,setShowConfirmation] = useState(false)
  const logout = ()=>{
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminPassword');
      localStorage.removeItem('user');
      navigate('/')
  }
  const cancelDeletion = () => {
    setShowConfirmation(false);
  };
  
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
    <Sidebar isNavOpen={isNavOpen}>
    <Logo>
        <NavLink to='/jobssearching'><LogoContainer isNavOpen={isNavOpen}> <img  src={logo} alt="Pacific Hunt logo" /></LogoContainer></NavLink>
        <MenuIcon isNavOpen={isNavOpen} onClick={toggleNav}>
          <IoMenu />
        </MenuIcon>
        <CloseIcon isNavOpen={isNavOpen} onClick={toggleNav}>
          <IoClose />
        </CloseIcon>
      </Logo>
      <SideNavigation>
        <NavContainer>
        <StyledNavLink to="/userDashboard/userprofile" end>
                
            <div className="StyledNavLink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M1 17V20C1 20.5523 1.44772 21 2 21H16C16.5523 21 17 20.5523 17 20V17C17 14.7909 15.2091 13 13 13H5C2.79086 13 1 14.7909 1 17ZM18.9839 20.3118C18.9485 20.655 19.1912 21 19.5363 21H22C22.5522 21 23 20.5523 23 20V17C23 14.7909 21.2091 13 19 13H18.0314C17.8153 13 17.6967 13.2597 17.8253 13.4334C18.5635 14.4304 19 15.6642 19 17V20C19 20.1053 18.9945 20.2093 18.9839 20.3118ZM13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM14.3509 10.9476C14.0101 10.892 13.894 10.4893 14.0782 10.1973C14.6622 9.2717 15.0001 8.17531 15.0001 7C15.0001 5.82469 14.6622 4.7283 14.0782 3.80271C13.894 3.51073 14.0101 3.10804 14.3509 3.05242C14.5622 3.01793 14.7791 3 15.0001 3C17.2093 3 19.0001 4.79086 19.0001 7C19.0001 9.20914 17.2093 11 15.0001 11C14.7791 11 14.5622 10.9821 14.3509 10.9476Z"
                  fill="currentColor"
                />
              </svg>{" "}
              <div className="text">Profile</div>
            </div>
          </StyledNavLink>
          <StyledNavLink to="/userDashboard/savedJobs">
            <div className="StyledNavLink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.81219 5.19691V6.70748L4.96211 6.85429C4.32652 6.90411 3.72643 7.16008 3.2578 7.58125C2.78916 8.00243 2.47904 8.5645 2.37702 9.1776C2.33225 9.45205 2.28965 9.72651 2.25252 10.002C2.24368 10.0686 2.25679 10.1363 2.28997 10.1952C2.32314 10.2541 2.37466 10.3012 2.43709 10.3297L2.52119 10.368C8.45039 13.1019 15.5504 13.1019 21.4785 10.368L21.5626 10.3297C21.6248 10.301 21.6761 10.2538 21.7091 10.1949C21.742 10.1361 21.755 10.0685 21.7461 10.002C21.7091 9.72665 21.6679 9.45181 21.6226 9.1776C21.5206 8.5645 21.2105 8.00243 20.7419 7.58125C20.2732 7.16008 19.6732 6.90411 19.0376 6.85429L17.1875 6.70855V5.19797C17.1876 4.75208 17.0234 4.32097 16.7248 3.98304C16.4261 3.6451 16.0129 3.4228 15.5602 3.35655L14.2278 3.16188C12.7508 2.94604 11.2489 2.94604 9.77188 3.16188L8.43947 3.35655C7.98697 3.42277 7.57388 3.64492 7.27526 3.98263C6.97665 4.32035 6.81234 4.7512 6.81219 5.19691ZM13.9842 4.73948C12.6687 4.54728 11.331 4.54728 10.0154 4.73948L8.68302 4.93415C8.61837 4.94357 8.55934 4.97527 8.51666 5.02349C8.47397 5.0717 8.45046 5.13324 8.45039 5.19691V6.59579C10.8147 6.46386 13.1849 6.46386 15.5493 6.59579V5.19691C15.5492 5.13324 15.5257 5.0717 15.483 5.02349C15.4403 4.97527 15.3813 4.94357 15.3167 4.93415L13.9842 4.73948Z"
                  fill="#EFFAFF"
                />
                <path
                  d="M21.9579 12.2275C21.9558 12.1931 21.9451 12.1597 21.9267 12.1302C21.9084 12.1008 21.883 12.0761 21.8527 12.0583C21.8224 12.0405 21.7881 12.0301 21.7528 12.0281C21.7175 12.0261 21.6822 12.0324 21.65 12.0466C15.5657 14.671 8.43401 14.671 2.34972 12.0466C2.31748 12.0324 2.28219 12.0261 2.24688 12.0281C2.21156 12.0301 2.17728 12.0405 2.14699 12.0583C2.11669 12.0761 2.09128 12.1008 2.07295 12.1302C2.05461 12.1597 2.0439 12.1931 2.04174 12.2275C1.93012 14.2641 2.04253 16.3065 2.37702 18.3198C2.47882 18.9331 2.78885 19.4954 3.2575 19.9168C3.72616 20.3382 4.32636 20.5943 4.96211 20.6442L7.00659 20.8037C10.33 21.0654 13.6686 21.0654 16.9931 20.8037L19.0376 20.6442C19.6733 20.5943 20.2735 20.3382 20.7422 19.9168C21.2108 19.4954 21.5209 18.9331 21.6226 18.3198C21.9568 16.3039 22.0704 14.2614 21.9579 12.2285"
                  fill="#EFFAFF"
                />
              </svg>
              <div className="text">Saved Jobs</div>
            </div>
            
          
          </StyledNavLink>
          <StyledNavLink to="/userDashboard/appliedJobs">
          
            <div className="StyledNavLink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11 1C12.4734 1 13.8865 1.57946 14.9284 2.61091C15.9702 3.64236 16.5556 5.04131 16.5556 6.5C16.5556 7.95869 15.9702 9.35764 14.9284 10.3891C13.8865 11.4205 12.4734 12 11 12C9.52658 12 8.1135 11.4205 7.07163 10.3891C6.02976 9.35764 5.44444 7.95869 5.44444 6.5C5.44444 5.04131 6.02976 3.64236 7.07163 2.61091C8.1135 1.57946 9.52658 1 11 1Z"
                  fill="#EFFAFF"
                />
                <path
                  d="M3.22222 23C2.63285 23 2.06762 22.7682 1.65087 22.3556C1.23413 21.9431 1 21.3835 1 20.8V19.7C1 18.2413 1.58532 16.8424 2.62718 15.8109C3.66905 14.7795 5.08213 14.2 6.55556 14.2H10.8333C11.2729 14.2 11.5199 14.7504 11.2977 15.1297C9.83415 17.628 10.9485 20.7846 11.6064 22.2226C11.7673 22.5743 11.5125 23 11.1258 23H3.22222Z"
                  fill="#EFFAFF"
                />
                <path
                  d="M17.4 23.8C18.8322 23.8 20.2057 23.2311 21.2184 22.2184C22.2311 21.2057 22.8 19.8322 22.8 18.4C22.8 16.9678 22.2311 15.5943 21.2184 14.5816C20.2057 13.5689 18.8322 13 17.4 13C15.9678 13 14.5943 13.5689 13.5816 14.5816C12.5689 15.5943 12 16.9678 12 18.4C12 19.8322 12.5689 21.2057 13.5816 22.2184C14.5943 23.2311 15.9678 23.8 17.4 23.8ZM17.4 15.4C17.5591 15.4 17.7117 15.4632 17.8243 15.5757C17.9368 15.6883 18 15.8409 18 16V17.8H19.8C19.9591 17.8 20.1117 17.8632 20.2243 17.9757C20.3368 18.0883 20.4 18.2409 20.4 18.4C20.4 18.5591 20.3368 18.7117 20.2243 18.8243C20.1117 18.9368 19.9591 19 19.8 19H18V20.8C18 20.9591 17.9368 21.1117 17.8243 21.2243C17.7117 21.3368 17.5591 21.4 17.4 21.4C17.2409 21.4 17.0883 21.3368 16.9757 21.2243C16.8632 21.1117 16.8 20.9591 16.8 20.8V19H15C14.8409 19 14.6883 18.9368 14.5757 18.8243C14.4632 18.7117 14.4 18.5591 14.4 18.4C14.4 18.2409 14.4632 18.0883 14.5757 17.9757C14.6883 17.8632 14.8409 17.8 15 17.8H16.8V16C16.8 15.8409 16.8632 15.6883 16.9757 15.5757C17.0883 15.4632 17.2409 15.4 17.4 15.4Z"
                  fill="#EFFAFF"
                />
              </svg>
              <div className="text">Applied Jobs</div>
            </div>
          </StyledNavLink>
           <StyledNavLink to="/userDashboard/setting">
          
            <div className="StyledNavLink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.0112 2C12.7952 2.00821 13.576 2.09539 14.3419 2.25949C14.5048 2.29442 14.6523 2.37735 14.7638 2.49669C14.8752 2.61604 14.9451 2.76583 14.9636 2.92515L15.1451 4.49135C15.1708 4.71216 15.25 4.92411 15.3765 5.11014C15.503 5.29618 15.6732 5.4511 15.8735 5.56245C16.0737 5.67379 16.2983 5.73846 16.5293 5.75123C16.7603 5.76401 16.9912 5.72454 17.2034 5.636L18.6988 5.00521C18.8508 4.94095 19.0198 4.92361 19.1824 4.95558C19.3451 4.98755 19.4933 5.06726 19.6068 5.18368C20.688 6.29244 21.4933 7.62224 21.962 9.07302C22.011 9.22557 22.0094 9.38899 21.9573 9.54061C21.9053 9.69223 21.8054 9.82454 21.6715 9.91919L20.3459 10.8587C20.1592 10.9902 20.0073 11.162 19.9026 11.3604C19.7979 11.5587 19.7433 11.7779 19.7433 12.0003C19.7433 12.2226 19.7979 12.4419 19.9026 12.6402C20.0073 12.8385 20.1592 13.0104 20.3459 13.1418L21.6736 14.0803C21.8077 14.1751 21.9077 14.3075 21.9598 14.4594C22.0119 14.6112 22.0134 14.7748 21.9641 14.9275C21.4956 16.3782 20.6907 17.7079 19.61 18.8169C19.4967 18.9333 19.3487 19.013 19.1863 19.0452C19.0238 19.0773 18.855 19.0603 18.7031 18.9964L17.2013 18.3635C16.9894 18.2743 16.7586 18.2342 16.5275 18.2466C16.2965 18.2589 16.0717 18.3233 15.8714 18.4346C15.6711 18.5458 15.5008 18.7008 15.3745 18.887C15.2481 19.0731 15.1692 19.2852 15.1441 19.5061L14.9625 21.0713C14.9444 21.2288 14.876 21.377 14.7669 21.4958C14.6577 21.6145 14.513 21.6981 14.3526 21.7349C12.8054 22.0884 11.1935 22.0884 9.64635 21.7349C9.48571 21.6982 9.34078 21.6148 9.23142 21.496C9.12205 21.3772 9.05358 21.2289 9.03538 21.0713L8.85486 19.5082C8.82864 19.288 8.74901 19.0767 8.62236 18.8915C8.49572 18.7062 8.32559 18.552 8.12563 18.4412C7.92568 18.3305 7.70148 18.2664 7.47102 18.254C7.24057 18.2415 7.0103 18.2812 6.79869 18.3697L5.29689 19.0015C5.14484 19.0656 4.9758 19.0828 4.81315 19.0507C4.65049 19.0185 4.50226 18.9386 4.38897 18.822C3.30808 17.7118 2.50353 16.3805 2.03585 14.9286C1.98661 14.7759 1.98813 14.6122 2.04019 14.4604C2.09226 14.3086 2.19229 14.1761 2.32639 14.0814L3.65409 13.1418C3.84085 13.0104 3.99273 12.8385 4.09742 12.6402C4.20211 12.4419 4.25666 12.2226 4.25666 12.0003C4.25666 11.7779 4.20211 11.5587 4.09742 11.3604C3.99273 11.162 3.84085 10.9902 3.65409 10.8587L2.32639 9.92125C2.19229 9.82652 2.09226 9.69404 2.04019 9.54221C1.98813 9.39038 1.98661 9.22674 2.03585 9.07404C2.50457 7.62327 3.30985 6.29346 4.3911 5.1847C4.50452 5.06829 4.65281 4.98858 4.81546 4.95661C4.97811 4.92464 5.14708 4.94198 5.29902 5.00624L6.79442 5.63702C7.007 5.72551 7.23823 5.76489 7.46953 5.75199C7.70084 5.73909 7.92577 5.67428 8.12625 5.56276C8.32674 5.45124 8.49719 5.29613 8.62392 5.10987C8.75064 4.92362 8.83011 4.71142 8.85593 4.49033L9.03751 2.92515C9.05584 2.76551 9.12575 2.61538 9.23743 2.49582C9.3491 2.37626 9.49695 2.29326 9.66024 2.25847C10.4325 2.09458 11.2204 2.00796 12.0112 2ZM11.9984 8.92327C11.1485 8.92327 10.3335 9.24745 9.73253 9.8245C9.13158 10.4016 8.79398 11.1842 8.79398 12.0003C8.79398 12.8164 9.13158 13.599 9.73253 14.1761C10.3335 14.7531 11.1485 15.0773 11.9984 15.0773C12.8483 15.0773 13.6633 14.7531 14.2643 14.1761C14.8652 13.599 15.2028 12.8164 15.2028 12.0003C15.2028 11.1842 14.8652 10.4016 14.2643 9.8245C13.6633 9.24745 12.8483 8.92327 11.9984 8.92327Z"
                  fill="#EFFAFF"
                />
              </svg>
              <div className="text">Setings</div>
            </div>
          </StyledNavLink>
        </NavContainer>
        <LogoutContainer>
          <div className="logout" onClick={()=>setShowConfirmation(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.8125 2H6.1875C4.38125 2 3 3.3 3 5V11H12.1375L9.69375 8.7C9.26875 8.3 9.26875 7.7 9.69375 7.3C10.1188 6.9 10.7562 6.9 11.1812 7.3L15.4312 11.3C15.8562 11.7 15.8562 12.3 15.4312 12.7L11.1812 16.7C10.7562 17.1 10.1188 17.1 9.69375 16.7C9.26875 16.3 9.26875 15.7 9.69375 15.3L12.1375 13H3V19C3 20.7 4.38125 22 6.1875 22H16.8125C18.6187 22 20 20.7 20 19V5C20 3.3 18.6187 2 16.8125 2Z"
                fill="#EFFAFF"
              />
            </svg>{" "}
            Log Out
          </div>
        </LogoutContainer>
      </SideNavigation>
    </Sidebar>
    <ConfirmationDialog
        open={showConfirmation}
        onConfirm={logout}
        onCancel={cancelDeletion}
        title="Confirm Deletion"
        message="Are you sure you want to Logout?"
      />
    </>
  );
}

export default userSidebar;
