import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import Button from "../Components/Button";



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
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

function EmployeerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <LoginContainer>
      <Navigation>
        <NavLink to="/">
          <Logo>
            <img src={logo} alt="Pacific Hunt logo" />
          </Logo>
        </NavLink>
        <div className="flex gap-2">
        <NavLink to='/jobseekerLogin'>
        <Button width="210px" text="Login As JobSeeker " primary="secondary"/></NavLink>
        <NavLink to='/jobseekerSignUp'>
        <Button width="220px" text="Sign Up As JobSeeker" primary="primary"/></NavLink>
        </div>
      </Navigation>
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
    </LoginContainer>
  );
}

export default EmployeerLogin;
