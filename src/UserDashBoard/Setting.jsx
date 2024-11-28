import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const userApi = import.meta.env.VITE_API_JOB_SEEKER;

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Setting = () => {
  const [userData, setUserData] = useState({
    email: "",
    phone: "",
    skills: [],
    address: "",
    username: "",
    education: [],
    experience: [],
    dateOfBirth: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newEducation, setNewEducation] = useState({
    id: uuidv4(),
    title: "",
    college: "",
    started: "",
    ended: "",
    isGoing: false,
  });
  const [newExperience, setNewExperience] = useState({
    id: uuidv4(),
    title: "",
    company: "",
    experience: "",
    description: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${userApi}/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const addSkill = () => {
    if (newSkill) {
      setUserData({ ...userData, skills: [...userData.skills, newSkill] });
      setNewSkill("");
    }
  };

  const addEducation = () => {
    if (newEducation.title && newEducation.college) {
      setUserData({
        ...userData,
        education: [...userData.education, { ...newEducation, id: Date.now() }],
      });
      setNewEducation({
        id: null,
        title: "",
        college: "",
        started: "",
        ended: "",
        isGoing: false,
      });
    }
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      setUserData({
        ...userData,
        experience: [
          ...userData.experience,
          { ...newExperience, id: Date.now() },
        ],
      });
      setNewExperience({
        id: null,
        title: "",
        company: "",
        experience: "",
        description: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${userApi}/${userId}`, userData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container>
      <h2>User Settings</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Details */}
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone</Label>
          <Input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Address</Label>
          <Input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Skills */}
        <FormGroup>
          <Label>Skills</Label>
          <div>
            {userData.skills.map((skill, index) => (
              <span key={index} style={{ marginRight: "8px" }}>
                {skill}
              </span>
            ))}
          </div>
          <Input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
          />
          <Button type="button" onClick={addSkill} style={{ marginTop: "8px" }}>
            Add Skill
          </Button>
        </FormGroup>

        {/* Education */}
        <FormGroup>
          <Label>Education</Label>
          {userData.education.map((edu, index) => (
            <div key={index}>
              <strong>{edu.title}</strong> at {edu.college} (
              {edu.started} - {edu.isGoing ? "Present" : edu.ended})
            </div>
          ))}
          <Input
            type="text"
            placeholder="Title"
            value={newEducation.title}
            onChange={(e) =>
              setNewEducation({ ...newEducation, title: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="College"
            value={newEducation.college}
            onChange={(e) =>
              setNewEducation({ ...newEducation, college: e.target.value })
            }
          />
          <Input
            type="date"
            placeholder="Started At"
            value={newEducation.started}
            onChange={(e) =>
              setNewEducation({ ...newEducation, started: e.target.value })
            }
          />
          
  <Label>Is Ongoing
  <Input
    type="checkbox"
    checked={newEducation.isGoing}
    onChange={(e) =>
      setNewEducation({ ...newEducation, isGoing: e.target.checked })
    }
  /></Label>
          {!newEducation.isGoing && <Input
            type="date"
            placeholder="Ended At"
            value={newEducation.ended}
            onChange={(e) =>
              setNewEducation({ ...newEducation, ended: e.target.value })
            }
          />}
          <Button type="button" onClick={addEducation}>
            Add Education
          </Button>
        </FormGroup>

        {/* Experience */}
        <FormGroup>
          <Label>Experience</Label>
          {userData.experience.map((exp, index) => (
            <div key={index}>
              <strong>{exp.title}</strong> at {exp.company} (
              {exp.experience})
            </div>
          ))}
          <Input
            type="text"
            placeholder="Title"
            value={newExperience.title}
            onChange={(e) =>
              setNewExperience({ ...newExperience, title: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Experience"
            value={newExperience.experience}
            onChange={(e) =>
              setNewExperience({ ...newExperience, experience: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) =>
              setNewExperience({ ...newExperience, description: e.target.value })
            }
          />
          <Button type="button" onClick={addExperience}>
            Add Experience
          </Button>
        </FormGroup>

        <Button type="submit">Save Changes</Button>
      </form>
    </Container>
  );
};

export default Setting;
