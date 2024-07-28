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



const UpdateWorkLocation = ({ open, onClose, onSubmit, title ,workLocation}) => {
  const [showAlert,setShowAlert] = useState(false);
  const [error,setError] = useState('')
  const [formData, setFormData] = useState({
    workLocationName: '',
  });

  useEffect(() => {
    if (workLocation) {
      // Initialize form data with category details
      setFormData({
        workLocationName: workLocation.locationType || '',
      });
    }
  }, [workLocation]);

  const mutation = useMutation({
    mutationFn: (updatedWorkLocation) => apiClient.update('workLocation',updatedWorkLocation.id, updatedWorkLocation),
    onSuccess: () => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
        setFormData({ workLocationName: '', });
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
    if(name=== 'workLocationName' && value.trim() !== ''){
      setError('');
    }
  };

  const handleSubmit = () => {
    if(formData.workLocationName.trim()=== ''){
      setError('Work Location cannot be empty');
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const updatedWorkLocation = {
        id: workLocation.id,
      locationType: formData.workLocationName,
      createdAt: currentDate,
      isActive:true,
    };

    mutation.mutate(updatedWorkLocation);
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
          name="workLocationName"
          label="Work Location Name"
          fullWidth
          margin="normal"
          value={formData.workLocationName}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
        
      </DialogContent>
      <div className="submitbtn p-6 text-[#fff] font-medium text-base flex flex-col gap-2">
        {showAlert && <Alert message="WorkLocation Updated sucessfully!"/> }
        <Buttons width="412px" onClick={handleSubmit} type="create" title="Update" />
      </div>
    </StyledDialog>
  );
};

export default UpdateWorkLocation;
