import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import styled from 'styled-components';
const DialougeContainer = styled.div`
position:absolute;
top:88px;
z-index:200;`

function ConfirmationDialog({ open, onConfirm, onCancel, title, message }) {
  return (
    <DialougeContainer>
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
    </DialougeContainer>
  );
}

export default ConfirmationDialog;
