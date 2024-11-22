import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

const JobApi = import.meta.env.VITE_API_JOBSEARCHING;

// Styled Components
const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 264px;
  padding: 20px;

  @media (max-width: 768px) {
    margin: 0;
    padding: 10px;
  }

  overflow-x: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  font-weight: bold;
  color: #555;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const PostJob = () => {


  const [formData, setFormData] = useState({
    id:`${uuidv4()}`,
    logo: '',
    email: '',
    title: '',
    skills: '',
    address: '',
    company: '',
    expiresIn: '',
    isExpired: false,
    maxSalary: '',
    minSalary: '',
    experience: '',
    salaryType: '',
    description: '',
    appliedBy:[]
  });
  // Setting default values from localStorage
  useEffect(() => {
    const companyDetails = JSON.parse(localStorage.getItem('employeerDetail'));
    if (companyDetails) {
      setFormData((prev) => ({
        ...prev,
        logo: companyDetails.companyLogo || '',
        company: companyDetails.companyName || '',
        email: companyDetails.companyEmail || '',
        address: companyDetails.companyAddress|| '',
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are populated
      if (!formData.title || !formData.skills || !formData.company || !formData.address) {
        alert("Please fill in all the required fields.");
        return;
      }
  
      const response = await axios.post(JobApi, formData);
      alert('Job posted successfully!');
      console.log('Response:', response.data);
      
      // Get company details from localStorage
      const companyDetails = JSON.parse(localStorage.getItem('employeerDetail')) || {};
  
      // Reset the form data including all fields
      setFormData({
        logo: companyDetails.companyLogo || '',
        email: companyDetails.companyEmail || '',
        title: '',
        skills: '',
        address: companyDetails.companyAddress || '',
        company: companyDetails.companyName || '',
        expiresIn: '',
        isExpired: false,
        maxSalary: '',
        minSalary: '',
        experience: '',
        salaryType: '',
        description: '',
        appliedBy:[],
      });
    } catch (error) {
      console.error('Error posting job:', error.response ? error.response.data : error);
      alert('Failed to post job. Please check the console for details.');
    }
  };
  
  

  return (
    <Container>
      <Title>Post a Job</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Logo URL:</Label>
          <Input type="text" name="logo" value={formData.logo} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Job Title:</Label>
          <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Skills (comma-separated):</Label>
          <Input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Address:</Label>
          <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Company Name:</Label>
          <Input type="text" name="company" value={formData.company} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Expires In (days):</Label>
          <Input type="number" name="expiresIn" value={formData.expiresIn} onChange={handleChange} required />
        </FormGroup>
        <CheckboxWrapper>
          <input
            type="checkbox"
            name="isExpired"
            checked={formData.isExpired}
            onChange={handleChange}
          />
          <CheckboxLabel>Is Expired</CheckboxLabel>
        </CheckboxWrapper>
        <FormGroup>
          <Label>Max Salary:</Label>
          <Input type="number" name="maxSalary" value={formData.maxSalary} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Min Salary:</Label>
          <Input type="number" name="minSalary" value={formData.minSalary} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Experience (years):</Label>
          <Input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Salary Type:</Label>
          <Select name="salaryType" value={formData.salaryType} onChange={handleChange} required>
            <option value="">Select Salary Type</option>
            <option value="Hourly">Hourly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Description:</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </FormGroup>
        <Button type="submit">Post Job</Button>
      </Form>
    </Container>
  );
};

export default PostJob;
