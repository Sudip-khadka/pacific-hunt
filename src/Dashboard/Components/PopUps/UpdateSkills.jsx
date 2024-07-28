import React, { useState,useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import Buttons from '../Buttons';
import Alert from '../Alert';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../Api';


const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    width: 460px;
  }
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



const UpdateSkills = ({ open, onClose, onSubmit, title ,skills}) => {
  const [showAlert,setShowAlert] = useState(false);
  const [error,setError] = useState('')
  const [formData, setFormData] = useState({
    skillsName: '',
  });

  useEffect(() => {
    if (skills) {
      // Initialize form data with category details
      setFormData({
        skillsName: skills.skillsName || '',
      });
    }
  }, [skills]);

  const mutation = useMutation({
    mutationFn: (updatedSkills) => apiClient.update('skills',updatedSkills.id, updatedSkills),
    onSuccess: () => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
        setFormData({ skillsName: '', });
        onSubmit(); // Callback to refetch data
      }, 3000); // Alert will be shown for 3 seconds
    },
    onError: (error) => {
      console.error('Error posting category:', error);
      setError('Failed to create category. Please try again.');
    }
  });

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(name=== 'skillsName' && value.trim() !== ''){
      setError('');
    }
  };

  const handleSubmit = () => {
    if(formData.skillsName.trim()=== ''){
      setError('Skills cannot be empty');
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const updatedSkills = {
        id: skills.id,
      skillsName: formData.skillsName,
      createdAt: currentDate,
      isActive:true,
    };

    mutation.mutate(updatedSkills);
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <PopupHeader>
        <DialogTitle>{title}</DialogTitle>
        <Button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#6B6D6F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </PopupHeader>
      <DialogContent>
        <TextField
          name="skillsName"
          label="Skills Name"
          fullWidth
          margin="normal"
          value={formData.skillsName}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
        
      </DialogContent>
      <div className="submitbtn p-6 text-[#fff] font-medium text-base flex flex-col gap-2">
        {showAlert && <Alert message="Skills Updated sucessfully!"/> }
        <Buttons width="412px" onClick={handleSubmit} type="create" title="Update" />
      </div>
    </StyledDialog>
  );
};

export default UpdateSkills;
