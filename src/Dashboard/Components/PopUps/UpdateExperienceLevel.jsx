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



const UpdateExperienceLevel = ({ open, onClose, onSubmit, title ,experienceLevel}) => {
  const [showAlert,setShowAlert] = useState(false);
  const [error,setError] = useState('')
  const [formData, setFormData] = useState({
    experienceLevel: '',
  });

  useEffect(() => {
    if (experienceLevel) {
      // Initialize form data with category details
      setFormData({
        experienceLevel: experienceLevel.experienceLevel || '',
      });
    }
  }, [experienceLevel]);

  const mutation = useMutation({
    mutationFn: (updatedExperienceLevel) => apiClient.update('experienceLevel',updatedExperienceLevel.id, updatedExperienceLevel),
    onSuccess: () => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
        setFormData({ experienceLevel: '', });
        onSubmit(); // Callback to refetch data
      }, 3000); // Alert will be shown for 3 seconds
    },
    onError: (error) => {
      console.error('Error posting Experience level:', error);
      setError('Failed to create Experience level. Please try again.');
    }
  });

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(name=== 'experienceLevel' && value.trim() !== ''){
      setError('');
    }
  };

  const handleSubmit = () => {
    if(formData.experienceLevel.trim()=== ''){
      setError('experienceLevel cannot be empty');
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const updatedExperienceLevel = {
        id: experienceLevel.id,
        experienceLevel: formData.experienceLevel,
      createdAt: currentDate,
      isActive:true,
    };

    mutation.mutate(updatedExperienceLevel);
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
          name="experienceLevel"
          label="Experience Level Name"
          fullWidth
          margin="normal"
          value={formData.experienceLevel}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
        
      </DialogContent>
      <div className="submitbtn p-6 text-[#fff] font-medium text-base flex flex-col gap-2">
        {showAlert && <Alert message="Experience Level Updated sucessfully!"/> }
        <Buttons width="412px" onClick={handleSubmit} type="create" title="Update" />
      </div>
    </StyledDialog>
  );
};

export default UpdateExperienceLevel;
