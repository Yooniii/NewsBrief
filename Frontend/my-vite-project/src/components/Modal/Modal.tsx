import { Fragment, useState } from 'react';
import './Modal.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40rem',
  height: '20rem',
  bgcolor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
  border: '0',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem'
};

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;
  
  return (
     
    <Modal
      open={isOpen}
      onClose={onRequestClose}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
          
      </Box>
    </Modal>
  )
}

export default ModalComponent;