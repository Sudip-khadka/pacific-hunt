import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../Components/Button";
import Alert from "../Dashboard/Components/Alert";
import { v4 as uuidv4 } from 'uuid';


const jobSeekerUsers = 'https://retoolapi.dev/iVQngS/jobSeeker';

const SignupContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f6f6;
  position: relative;
  font-family: "Be Vietnam Pro";
`;

const SignupForm = styled.form`
  position: absolute;
  left: 700px;
  top: 100px;
  padding: 2rem;
  width: 500px;
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
  border: 1px solid ${(props) => (props.valid === true ? 'green' : props.valid === false ? 'red' : '#ccc')};
  border-radius: 5px;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
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

const Navigation = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 112px;
  background: #fff;
  box-shadow: 0px 1px 0px 0px #e5e9f2;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LoginSvg = styled.img`
  width: 700px;
  align-self: end;
  margin-left: 200px;
`;

function JobSeekerSignup() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);
  const [address, setAddress] = useState("");
  const [addressValid, setAddressValid] = useState(null);
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(null);
  const [dob, setDob] = useState("");
  const [dobValid, setDobValid] = useState(null);
  const [existingUsers, setExistingUsers] = useState([]);
  const navigate = useNavigate();
const [errorMessage,setErrorMessage]= useState("")
const [showAlert,setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch existing users to check for duplicate emails
    const fetchExistingUsers = async () => {
      try {
        const response = await fetch(jobSeekerUsers);
        const data = await response.json();
        setExistingUsers(data);
      } catch (error) {
        console.error('Error fetching existing users:', error);
      }
    };
    fetchExistingUsers();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const isEmailUnique = (email) => {
    return !existingUsers.some(user => user.email === email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isEmailValid = validateEmail(email);
    const isEmailUniqueValid = isEmailUnique(email);
  
    setEmailValid(isEmailValid && isEmailUniqueValid);
  
    const isPasswordValid = password.length >= 6;
    setPasswordValid(isPasswordValid);
  
    const isConfirmPasswordValid = password === confirmPassword;
    setConfirmPasswordValid(isConfirmPasswordValid);
  
    const isAddressValid = address.trim() !== "";
    setAddressValid(isAddressValid);
  
    const isPhoneValid = validatePhone(phone);
    setPhoneValid(isPhoneValid);
  
    const isUsernameValid = username.trim() !== "";
    setUsernameValid(isUsernameValid);
  
    const isDobValid = dob.trim() !== "";
    setDobValid(isDobValid);
  
    if (isEmailValid && isEmailUniqueValid && isPasswordValid && isConfirmPasswordValid && isAddressValid && isPhoneValid && isUsernameValid && isDobValid) {
      const newUser = { userId:uuidv4(),username, email, password, address, phone, dob, };
  
      try {
        const response = await fetch(jobSeekerUsers, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
  
        if (response.ok) {
            setShowAlert(true)
            setTimeout(()=>{
                navigate('/jobseekerLogin');
                setShowAlert(false)

            },2000)
        } else {
          alert('Failed to sign up. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      if (!isEmailUniqueValid) {
        setErrorMessage("User with entered email already exists.");
      } else {
        setErrorMessage("");
      }
    }
  };
  

  return (
    <SignupContainer>
      <Navigation>
        <NavLink to="/">
          <Logo>
            <img src={logo} alt="Pacific Hunt logo" />
          </Logo>
        </NavLink>
        <div className="flex gap-2">
          <NavLink to='/employeerLogin'>
            <Button width="210px" text="Login As Employeer" primary="secondary" />
          </NavLink>
          <NavLink to='/employeerSignUp'>
            <Button width="220px" text="Sign Up As Employeer" primary="primary" />
          </NavLink>
        </div>
      </Navigation>
      <LoginSvg src="/loginasset.svg" alt="Logo" />

      <SignupForm onSubmit={handleSubmit}>
        <h1 className="mt-0 font-semibold">
          Sign Up As <span className="text-[#01A3E0]">JobSeeker</span>
        </h1>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          valid={usernameValid}
          required
        />
        {usernameValid === false && <ErrorMessage>Please enter your username</ErrorMessage>}

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          valid={emailValid}
          required
        />
        {emailValid === false && <ErrorMessage>{errorMessage} Please enter a valid and unique email</ErrorMessage>}

        <InputField
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          valid={phoneValid}
          required
        />
        {phoneValid === false && <ErrorMessage>Please enter a valid phone number</ErrorMessage>}

        <div className="flex justify-between">
        <InputField
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          valid={addressValid}
          required
        />
        {addressValid === false && <ErrorMessage>Please enter your address</ErrorMessage>}

        <InputField
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          valid={dobValid}
          required
        />
        {dobValid === false && <ErrorMessage>Please enter your date of birth</ErrorMessage>}

        </div>
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          valid={passwordValid}
          required
        />
        {passwordValid === false && <ErrorMessage>Password must be at least 6 characters</ErrorMessage>}

        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          valid={confirmPasswordValid}
          required
        />
        {confirmPasswordValid === false && <ErrorMessage>Passwords do not match</ErrorMessage>}

        <SubmitButton type="submit">Sign Up</SubmitButton>
        <div className="mt-5">
          <p>Already have an account? <NavLink to='/jobseekerLogin'> <span className="ml-2 text-[#01A3E0] underline">Login</span></NavLink></p>
        </div>
        {showAlert && <Alert message="User Sucessfully Created You Can Login Now !" />}
      </SignupForm>
    </SignupContainer>
  );
}

export default JobSeekerSignup;
