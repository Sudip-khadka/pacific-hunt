import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import Buttons from '../Buttons';
import Alert from '../Alert';
import apiClient from '../../../Api';
import { CiImageOn } from "react-icons/ci";

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    width: 560px;
  }
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  justify-content: space-between;
`;

const UpdateSocialMedia = ({ open, onClose, onSubmit, title,socialMedia }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [enteredIcon, setEnteredIcon] = useState('');
  const [formData, setFormData] = useState({
    socialMediaName: '',
    socialMediaUrl: '',
    icon: '',
    isPopularCategory: false,
  });
  const [error, setError] = useState({
    socialMediaName: '',
    socialMediaUrl: '',
    icon: ''
  });
  useEffect(() => {
    if (socialMedia) {
        console.log(socialMedia);
      // Initialize form data with category details
      setFormData({
        socialMediaName: socialMedia.socialMediaName || '',
        socialMediaUrl: socialMedia.socialMediaUrls || '',
        icon: socialMedia.socialMediaImage || '',
        isActiveMedia: socialMedia.isPopularCategory || true,
      });
      setEnteredIcon(socialMedia.socialMediaImage)
    }
  }, [socialMedia]);

  const mutation = useMutation({
    mutationFn: (newSocialMedia) => apiClient.update('socialMedia',newSocialMedia.id, newSocialMedia),
    onSuccess: () => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
        setFormData({ socialMediaName: '', socialMediaUrl: '', icon: '',});
        onSubmit(); // Callback to refetch data
      }, 3000); // Alert will be shown for 3 seconds
    },
    onError: (error) => {
      console.error('Error posting category:', error);
      setError('Failed to create category. Please try again.');
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if(name === 'icon'){
      setEnteredIcon(value);
    }
    setError((prevError) => ({
      ...prevError,
      [name]: ''
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newError = {
      socialMediaName: '',
      socialMediaUrl: '',
      icon: ''
    };
  
    if (formData.socialMediaName.trim() === '') {
      newError.socialMediaName = 'Social media name cannot be empty';
      isValid = false;
    }
    if (formData.socialMediaUrl.trim() === '') {
      newError.socialMediaUrl = 'Url cannot be empty';
      isValid = false;
    }
    if (formData.icon.trim() === '') {
      newError.icon = 'Icon cannot be empty';
      isValid = false;
    }
  
    setError(newError);
  
    if (!isValid) {
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newSocialMedia = {
            id:socialMedia.id,
      socialMediaName: formData.socialMediaName,
      socialMediaUrls: formData.socialMediaUrl,
      socialMediaImage:formData.icon,
      createdAt: currentDate,
      isActiveMedia: true,
    };
    setEnteredIcon('');
    mutation.mutate(newSocialMedia);
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
          name="socialMediaName"
          label="Social Media Name"
          fullWidth
          margin="normal"
          value={formData.socialMediaName}
          onChange={handleInputChange}
          error={!!error.socialMediaName}
          helperText={error.socialMediaName}
        />
        <TextField
          name="socialMediaUrl"
          label="Url"
          fullWidth
          margin="normal"
          value={formData.socialMediaUrl}
          onChange={handleInputChange}
          error={!!error.socialMediaUrl}
          helperText={error.socialMediaUrl}
        />
        <FlexContainer>
          <TextField
            name="icon"
            label="Social Media Icon"
            fullWidth
            margin="normal"
            value={enteredIcon}
            onChange={handleInputChange}
            error={!!error.icon}
            helperText={error.icon}
            sx={{
              width: "80%",
            }}
          />
        {enteredIcon === '' ? (
  <div className='flex'>
    <CiImageOn style={{ width: '70px', height: '70px' }} />
  </div>
) : (
  <img src={enteredIcon} alt="Social Media Icon" style={{ width: '70px', height: '70px' }} />
)}
        </FlexContainer>
      </DialogContent>
      <div className="submitbtn p-6 text-[#fff] font-medium text-base flex flex-col gap-3">
        {showAlert && <Alert message="Social Media Updated successfully!" />}
        <Buttons width="512px" onClick={handleSubmit} type="create" title="Update" />
      </div>
    </StyledDialog>
  );
};

export default UpdateSocialMedia;
