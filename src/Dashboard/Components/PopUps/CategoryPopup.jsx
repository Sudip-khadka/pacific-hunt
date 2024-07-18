import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import styled from 'styled-components';
import Buttons from '../Buttons';
import Alert from '../Alert';

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

const StyledFormControlLabel = styled(FormControlLabel)`
  width: 100%;
  margin: 12px 0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px 12px;
  box-sizing: border-box;
  margin-left: 0px !important;
`;

const CategoryPopup = ({ open, onClose, onSubmit, title }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: '',
    isPopular: false,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'categoryName' && value.trim() !== '') {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.categoryName.trim() === '') {
      setError('Category name cannot be empty');
      return;
    }
    
    // Show success alert
    setShowAlert(true);

    // Delay the submission and closing of the dialog
    setTimeout(() => {
      onSubmit(formData);
      setFormData({
        categoryName: '',
        isPopular: false,
      });
      setShowAlert(false);
      onClose();
    }, 2000); // 2 second delay
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
          name="categoryName"
          label="Create Category"
          fullWidth
          margin="normal"
          value={formData.categoryName}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
        <StyledFormControlLabel
          control={
            <Checkbox
              name="isPopular"
              checked={formData.isPopular}
              onChange={handleInputChange}
            />
          }
          label="Mark as Popular Category"
        />
      </DialogContent>
      <div className="submitbtn p-6 text-[#fff] font-medium text-base flex flex-col gap-3">
      {showAlert && <Alert message="Category created successfully!" />}
        <Buttons width="412px" onClick={handleSubmit} type="create" title="Create" />
      </div>
    </StyledDialog>
  );
};

export default CategoryPopup;