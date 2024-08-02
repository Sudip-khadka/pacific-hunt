import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { NavLink} from "react-router-dom";
import Button from "../Components/Button";
import { useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";


const LoginContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f6f6;
  position: relative;
  font-family: "Be Vietnam Pro";
`;

const LoginForm = styled.form`
  position: absolute;
  left: 700px;
  padding: 2rem;
  border-radius: 10px;
  width: 450px;
  display: flex;
  text-align: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
   @media(max-width:768px){
  left:0px;
  height:100%;
  width:100%;}
`;

const InputField = styled.input`
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const LoginSvg = styled.img`
  width: 700px;
  align-self: end;
  margin-left: 200px;
  @media(max-width:768px){
    align-self: between;
    margin:0px;
  height:100%;
  width:100%;}
`;

const Navigation = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 112px;
  background: #fff;
  box-shadow: 0px 1px 0px 0px #e5e9f2;
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  z-index: 10;
  @media (max-width: 768px) {
  
    height: ${props => (props.isNavOpen ? '100vh' : '50px')};
    width: ${props => (props.isNavOpen ? '65%' : '50px')};
    padding: 25px;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    background: ${props => (props.isNavOpen ? '#FFF' : 'transparent')}; /* Ensure background covers entire width */
    box-shadow: none; /* Optional: remove box-shadow on mobile */
    .userdata{
    display:${props => (props.isNavOpen ? 'flex' : 'none')};}
    flex-direction:column;
  }
     @media (max-width: 500px) {
     padding:25px 10px 20px 10px;
     }
`;
const MenuIcon = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
  font-size: 40px;
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
const LogoContainer = styled.div`
@media(max-width:768px){
  display: ${props => (props.isNavOpen ? 'block' : 'none')};
  }
`;


function EmployeerLogin() {
  const [email, setEmail] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
useEffect(()=>{
  let employeerEmail = localStorage.getItem('adminEmail');
  let employeerPassword = localStorage.getItem('adminPassword');
  if(employeerEmail == "superadmin@gmail.com" && employeerPassword=="superadmin"){
navigate('/dashboard');
  }
  else if(employeerEmail && employeerPassword){
    navigate('/employeerDashboard');
  }
},[])
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent form submission
  
    console.log("Form submitted");
    console.log("Email:", email);
    console.log("Password:", password);
    
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    console.log("Trimmed Email:", trimmedEmail);
    console.log("Trimmed Password:", trimmedPassword);
    
    const isEmailMatch = trimmedEmail === "superadmin@gmail.com";
    const isPasswordMatch = trimmedPassword === "superadmin";
    
    console.log("Email match:", isEmailMatch);
    console.log("Password match:", isPasswordMatch);
    
    if (isEmailMatch && isPasswordMatch) {
      localStorage.setItem('adminEmail',trimmedEmail)
      localStorage.setItem('adminPassword',trimmedPassword)
      console.log("Condition met, navigating...");
      navigate('/dashboard');
    } else {
      console.log("Condition not met");
    }
  };
  
  
  return (
    <>
      <Navigation isNavOpen={isNavOpen}>
      <Logo>
        <NavLink to='/'><LogoContainer isNavOpen={isNavOpen}> <img  src={logo} alt="Pacific Hunt logo" /></LogoContainer></NavLink>
        <MenuIcon isNavOpen={isNavOpen} onClick={toggleNav}>
          <IoMenu />
        </MenuIcon>
        <CloseIcon isNavOpen={isNavOpen} onClick={toggleNav}>
          <IoClose />
        </CloseIcon>
      </Logo>
        <div className="userdata flex gap-2 flex-col md:flex-row">
        <NavLink to='/jobseekerLogin'>
        <Button width="210px" text="Login As JobSeeker " primary="secondary"/></NavLink>
        <NavLink to='/jobseekerSignUp'>
        <Button width="220px" text="Sign Up As JobSeeker" primary="primary"/></NavLink>
        </div>
      </Navigation>
    <LoginContainer>
      <LoginSvg src="/loginasset.svg" alt="Logo" />

      <LoginForm onSubmit={handleSubmit}>
        <h1 className="mt-0 font-semibold">
          Login As <span className="text-[#01A3E0]">Employeer</span>
        </h1>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">Login</SubmitButton>
        <div className="mt-5">
            <p>Not Registered Yet? <NavLink to='/employeerSignup'> <span className="ml-2 text-[#01A3E0] underline">Sign Up</span></NavLink></p>
        </div>
      </LoginForm>
    </LoginContainer></>
  );
}

export default EmployeerLogin;
