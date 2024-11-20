import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../Components/Button";
import Alert from "../Dashboard/Components/Alert";
import { v4 as uuidv4 } from 'uuid';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const jobSeekerUsers = import.meta.env.VITE_API_JOB_SEEKER;

const SignupContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f6f6;
  position: relative;
  font-family: "Be Vietnam Pro";
  @media(max-width:768px){
  height:200vh;}
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
  @media(max-width:768px){
  top:0px;
  left:0px;
  height:100%;
  width:100%;}
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
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  z-index: 10;
  @media (max-width: 768px) {
  
    height: ${props => (props.isNavOpen ? '100vh' : '50px')};
    width: ${props => (props.isNavOpen ? '55%' : '50px')};
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

function JobSeekerSignup() {
  const [isNavOpen, setIsNavOpen] = useState(false);
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
  
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <SignupContainer>
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
        <div className="userdata flex gap-2 flex-col md:flex-row ">
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

        <div className="flex justify-between flex-wrap">
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
