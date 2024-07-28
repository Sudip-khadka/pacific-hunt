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



const UpdateEducationLevel = ({ open, onClose, onSubmit, title ,educationLevel}) => {
  const [showAlert,setShowAlert] = useState(false);
  const [error,setError] = useState('')
  const [formData, setFormData] = useState({
    educationLevel: '',
  });

  useEffect(() => {
    if (educationLevel) {
      // Initialize form data with category details
      setFormData({
        educationLevel: educationLevel.educationLevel || '',
      });
    }
  }, [educationLevel]);

  const mutation = useMutation({
    mutationFn: (updatedEducationLevel) => apiClient.update('educationLevel',updatedEducationLevel.id, updatedEducationLevel),
    onSuccess: () => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
        setFormData({ educationLevel: '', });
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
    if(name=== 'educationLevel' && value.trim() !== ''){
      setError('');
    }
  };

  const handleSubmit = () => {
    if(formData.educationLevel.trim()=== ''){
      setError('EducationLevel cannot be empty');
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const updatedEducationLevel = {
        id: educationLevel.id,
        educationLevel: formData.educationLevel,
      createdAt: currentDate,
      isActive:true,
    };

    mutation.mutate(updatedEducationLevel);
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
          name="educationLevel"
          label="Education Level Name"
          fullWidth
          margin="normal"
          value={formData.educationLevel}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
        
      </DialogContent>
      <div className="submitbtn p-6 text-[#fff] font-medium text-base flex flex-col gap-2">
        {showAlert && <Alert message="Education Level Updated sucessfully!"/> }
        <Buttons width="412px" onClick={handleSubmit} type="create" title="Update" />
      </div>
    </StyledDialog>
  );
};

export default UpdateEducationLevel;
