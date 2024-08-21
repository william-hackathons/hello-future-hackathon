'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';


// Next.js ServerActions
import { mintNFT } from '@/app/actions'


export default function MintDialog() {
  const [open, setOpen] = React.useState(false);
  const [antigens, setAntigens] = React.useState('');
  const [rh, setRh] = React.useState('');
  const [donation, setDonation] = React.useState('');
  const [litres, setLitres] = React.useState(5)

  const handleLitresChange = (event) => {
    setLitres(event.target.value)
  }

  const handleDonationChange = (event) => {
    setDonation(event.target.value);
  };

  const handleRhChange = (event) => {
    setRh(event.target.value);
  };

  const handleAntigensChange = (event) => {
    setAntigens(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    mintNFT(antigens, rh, donation, litres);
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        New NFT-FSM
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create New NFT-FSM</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Submitting this form will: <br/> - Create a Topic on Hedera Consensus Service, <br/> - Post a Message to that topic representing the initial FSM state, <br/> - Mint a NFT linking to that FSM Topic in metadata using Hedera Token Service.
          </DialogContentText>
          <br/>
          
          <h4>Phenotype Data: </h4>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <AntigenSelect antigens={antigens} handleChange={handleAntigensChange}/>
            </Grid>
            <Grid item xs={4}>
              <RhSelect rh={rh} handleChange={handleRhChange}/>
            </Grid>
          </Grid>

          <br/>
          <h4>Donation Data: </h4>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <DonationSelect donation={donation} handleChange={handleDonationChange}/>
            </Grid>
            <Grid item xs={4}>
              <LitresCollected litres={litres} handleChange={handleLitresChange}/>
            </Grid>
          </Grid>
          <br/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Mint NFT-FSM</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function AntigenSelect({antigens, handleChange}) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label">Antigens</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={antigens}
          label="Antigens"
          onChange={handleChange}
        >
          <MenuItem value={'A'}>A</MenuItem>
          <MenuItem value={'B'}>B</MenuItem>
          <MenuItem value={'AB'}>AB</MenuItem>
          <MenuItem value={'O'}>O</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function RhSelect({rh, handleChange}) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label">Rh Factor</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rh}
          label="Antigens"
          onChange={handleChange}
        >
          <MenuItem value={'-'}>-</MenuItem>
          <MenuItem value={'+'}>+</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function DonationSelect({donation, handleChange}) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label">Donation Type</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={donation}
          label="Antigens"
          onChange={handleChange}
        >
          <MenuItem value={'whole-blood-donation'}>Whole Blood Donation</MenuItem>
          <MenuItem value={'apheresis-donation'}>Apheresis Donation</MenuItem>
          <MenuItem value={'platelet-donation'}>Platelet Donation</MenuItem>
          <MenuItem value={'plasma-donation'}>Plasma Donation</MenuItem>
          <MenuItem value={'double-red-blood-cell-donation'}>Double Red Blood Cell Donation</MenuItem>
          <MenuItem value={'power-red-donation'}>Power Red Donation</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}


function LitresCollected({litres, handleChange}) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" fullWidth>
        <TextField
          required
          id="standard-basic"
          type="number"
          label="Litres Collected"
          variant="standard"
          value={litres}
          onChange={handleChange}
          endAdornment={<InputAdornment position="end">L</InputAdornment>}
        />
      </FormControl>
    </Box>
  )
}







