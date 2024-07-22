import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
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

const CompanyTypePopup = ({ open, onClose, onSubmit, title }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'companyName' && value.trim() !== '') {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.companyName.trim() === '') {
      setError('Company Name is required');
      return;
    }

    setShowAlert(true);

    setTimeout(() => {
      onSubmit(formData);
      setFormData({
        companyName: '',
      });
      setShowAlert(false);
      onClose();
    }, 2000); // 2-second delay
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
          name="companyName"
          label="Company Name"
          fullWidth
          margin="normal"
          value={formData.companyName}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <div className="submitbtn p-6 text-[#fff] font-medium text-base flex flex-col gap-2">
        {showAlert && <Alert message="Company created successfully!" />}
        <Buttons width="412px" onClick={handleSubmit} type="create" title="Create" />
      </div>
    </StyledDialog>
  );
};

export default CompanyTypePopup;
