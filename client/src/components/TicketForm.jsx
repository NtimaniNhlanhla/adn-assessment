import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTicket } from '../features/ticket/ticketSlice'
import { toast } from 'react-toastify'

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TicketsFilter from './TicketsFilter';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function TicketForm({onFilterChange}) {

  const [description, setDescription] = useState('')
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault()

    if (!description) {
      toast.error('Provide Ticket Description.');
      return;
    }

    dispatch(createTicket({ description }))
    setDescription('')
  }

  const dispatch = useDispatch();

  return <section className='form'>
    <div >
      <div className='model'>
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create New Ticket
        </Button>
        </div>
        <div className='filter'>
           <TicketsFilter onFilterChange={onFilterChange} />
        </div>
       
      </div>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Ticket
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent >
          <Typography gutterBottom component='div' className='model'>
            <form onSubmit={onSubmit} style={{ width: '500px' }}>
              <div className="form-group">
                <label htmlFor='description'>Ticket Description</label>
                <input type="text" name='description' id='description'
                  placeholder='Enter Ticket Description'
                  maxLength={100}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-block">
                  Add Ticket
                </button>
              </div>
            </form>
          </Typography>

        </DialogContent>
      </BootstrapDialog>
    </div>
  </section>
}

export default TicketForm
