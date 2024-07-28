import React, { useState } from 'react';
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



const WorkLocationPopup = ({ open, onClose, onSubmit, title }) => {
  const [showAlert,setShowAlert] = useState(false);
  const [error,setError] = useState('')
  const [formData, setFormData] = useState({
    locationType: '',
  });

  const mutation = useMutation({
    mutationFn: (newWorkLocation) => apiClient.post('workLocation', newWorkLocation),
    onSuccess: () => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
        setFormData({ locationType: '', });
        onSubmit(); // Callback to refetch data
      }, 3000); // Alert will be shown for 3 seconds
    },
    onError: (error) => {
      console.error('Error posting New Skill:', error);
      setError('Failed to create New Skill. Please try again.');
    }
  });

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(name=== 'locationType' && value.trim() !== ''){
      setError('');
    }
  };

  const handleSubmit = () => {
    if(formData.locationType.trim()=== ''){
      setError('Skills cannot be empty');
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newWorkLocation = {
        locationType: formData.locationType,
      createdAt: currentDate,
      isActive:true,
    };

    mutation.mutate(newWorkLocation);
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
          name="locationType"
          label="Work Location"
          fullWidth
          margin="normal"
          value={formData.locationType}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
        
      </DialogContent>
      <div className="submitbtn p-6 text-[#fff] font-medium text-base flex flex-col gap-2">
        {showAlert && <Alert message="Work Location added sucessfully!"/> }
        <Buttons width="412px" onClick={handleSubmit} type="create" title="Create" />
      </div>
    </StyledDialog>
  );
};

export default WorkLocationPopup;
