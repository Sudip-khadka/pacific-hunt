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



const ProfessionPopup = ({ open, onClose, onSubmit, title }) => {
  const [showAlert,setShowAlert] = useState(false);
  const [error,setError] = useState('')
  const [formData, setFormData] = useState({
    professionName: ''
  });

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(name=== 'professionName' && value.trim() !== ''){
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.professionName.trim()=== ''){
      setError('Profession cannot be empty');
      return;
    }

    setShowAlert(true);
    setTimeout(()=>{

      onSubmit(formData);
      setFormData({
        professionName: '',
      });
      setShowAlert(false);
      onClose();
    },2000)

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
          name="professionName"
          label="Profession Name"
          fullWidth
          margin="normal"
          value={formData.professionName}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
        
      </DialogContent>
      <div className="submitbtn p-6 text-[#fff] font-medium text-base flex flex-col gap-2">
        {showAlert && <Alert message="Profession created sucessfully!"/> }
        <Buttons width="412px" onClick={handleSubmit} type="create" title="Create" />
      </div>
    </StyledDialog>
  );
};

export default ProfessionPopup;
