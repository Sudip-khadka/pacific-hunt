import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const userApi = import.meta.env.VITE_API_JOB_SEEKER;

const Setting = () => {
  const [userData, setUserData] = useState({
    email: "",
    phone: "",
    skills: [],
    address: "",
    username: "",
    education: [],
    experience: [],
    expectedSalary:"",
    dateOfBirth: "",
  });
  const [validationErrors, setValidationErrors] = useState({});


  const [newSkill, setNewSkill] = useState("");
  const [newEducation, setNewEducation] = useState({
    id: uuidv4(),
    title: "",
    college: "",
    started: "",
    ended: "",
    isGoing: false,
    level: "",
  });

  const [newExperience, setNewExperience] = useState({
    id: uuidv4(),
    title: "",
    company: "",
    experience: "",
    description: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${userApi}/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId) fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  
    let error = null;
    if (name === "expectedSalary") error = validateSalary(value);
    if (name === "email") error = validateEmail(value);
    if (name === "phone") error = validatePhone(value);
  
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  

  const addSkill = () => {
    if (newSkill.trim()) {
      setUserData({ ...userData, skills: [...userData.skills, newSkill] });
      setNewSkill("");
    }
  };

  const deleteSkill = (skill) => {
    setUserData({
      ...userData,
      skills: userData.skills.filter((item) => item !== skill),
    });
  };

  const addEducation = () => {
    if (newEducation.title && newEducation.college && newEducation.level) {
      setUserData({
        ...userData,
        education: [...userData.education, { ...newEducation, id: uuidv4() }],
      });
      setNewEducation({
        id: uuidv4(),
        title: "",
        college: "",
        started: "",
        ended: "",
        isGoing: false,
        level: "",
      });
    }
  };

  const deleteEducation = (id) => {
    setUserData({
      ...userData,
      education: userData.education.filter((edu) => edu.id !== id),
    });
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      setUserData({
        ...userData,
        experience: [...userData.experience, { ...newExperience, id: uuidv4() }],
      });
      setNewExperience({
        id: uuidv4(),
        title: "",
        company: "",
        experience: "",
        description: "",
      });
    }
  };

  const deleteExperience = (id) => {
    setUserData({
      ...userData,
      experience: userData.experience.filter((exp) => exp.id !== id),
    });
  };
  ////Form validation
  const validateSalary = (salary) => {
    if (!salary || isNaN(salary) || salary <= 0) {
      return "Expected salary must be a positive number.";
    }
    return null;
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return "Enter a valid email address.";
    }
    return null;
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return "Phone number must be 10 digits.";
    }
    return null;
  };
  

  const validateAllFields = () => {
    const errors = {};
    errors.expectedSalary = validateSalary(userData.expectedSalary);
    errors.email = validateEmail(userData.email);
    errors.phone = validatePhone(userData.phone);
  
    const valid = Object.values(errors).every((error) => error === null);
    setValidationErrors(errors);
    return valid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAllFields()) {
      alert("Please fix validation errors before submitting.");
      return;
    }
    try {
      await axios.put(`${userApi}/${userId}`, userData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Basic Details */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Expected Salary (Rs)"
              name="expectedSalary"
              value={userData.expectedSalary}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Skills */}
        <Typography variant="h5" sx={{ mt: 4 }}>
          Skills
        </Typography>
        <Grid container spacing={2}>
          {userData.skills.map((skill, index) => (
            <Grid item key={index}>
              <Card>
                <CardContent>{skill}</CardContent>
                <CardActions>
                  <IconButton onClick={() => deleteSkill(skill)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <TextField
          fullWidth
          label="Add a Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={addSkill}>
          Add Skill
        </Button>

        {/* Education */}
        <Typography variant="h5" sx={{ mt: 4 }}>
          Education
        </Typography>
        {userData.education.map((edu) => (
          <Card key={edu.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography>
                <strong>{edu.title}</strong> at {edu.college} (
                {edu.started} - {edu.isGoing ? "Present" : edu.ended})
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => deleteEducation(edu.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={newEducation.title}
              onChange={(e) =>
                setNewEducation({ ...newEducation, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="College"
              value={newEducation.college}
              onChange={(e) =>
                setNewEducation({ ...newEducation, college: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Started"
              type="date"
              value={newEducation.started}
              onChange={(e) =>
                setNewEducation({ ...newEducation, started: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <Checkbox
              checked={newEducation.isGoing}
              onChange={(e) =>
                setNewEducation({ ...newEducation, isGoing: e.target.checked })
              }
            />
            <Typography variant="body1">Ongoing</Typography>
          </Grid>
          {!newEducation.isGoing && (
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Ended"
                type="date"
                value={newEducation.ended}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, ended: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select
                value={newEducation.level}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, level: e.target.value })
                }
              >
                <MenuItem value="High School">High School</MenuItem>
                <MenuItem value="Bachelor's">Bachelor's</MenuItem>
                <MenuItem value="Master's">Master's</MenuItem>
                <MenuItem value="PhD">PhD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }} onClick={addEducation}>
          Add Education
        </Button>

        {/* Experience */}
        <Typography variant="h5" sx={{ mt: 4 }}>
          Experience
        </Typography>
        {userData.experience.map((exp) => (
          <Card key={exp.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography>
                <strong>{exp.title}</strong> at {exp.company} (
                {exp.experience})
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => deleteExperience(exp.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({ ...newExperience, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({ ...newExperience, company: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
  <FormControl fullWidth>
    <InputLabel id="experience-label">Duration (In Yrs)</InputLabel>
    <Select
      labelId="experience-label"
      id="experience-select"
      value={newExperience.experience}
      onChange={(e) =>
        setNewExperience({ ...newExperience, experience: e.target.value })
      }
    >
      <MenuItem value="0">0</MenuItem>
      <MenuItem value="0-1">0-1</MenuItem>
      <MenuItem value="1-2">1-2</MenuItem>
      <MenuItem value="2-3">2-3</MenuItem>
      <MenuItem value="3-4">3-4</MenuItem>
      <MenuItem value=">4">More than 4</MenuItem>
    </Select>
  </FormControl>
</Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({ ...newExperience, description: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }} onClick={addExperience}>
          Add Experience
        </Button>
        <br/>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default Setting;
