import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CancelLink from './btn/HyperLinkBtn';
import AddButton from './btn/AddButton';

const ChangePasswordPopup = ({ open, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    // Add logic to handle password change here
    if (newPassword === confirmPassword) {
      alert('Password changed successfully!');
      onClose(); // Close the modal after successful change
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        
        <CancelLink  Hyperbtntext=" Cancel" onClick={onClose}/>
        {/* <Button color="primary">
       
        </Button> */}
        <AddButton btn="Change
        Password"  onClick={handleSubmit}/>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordPopup;
