import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material';

const ContactContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function ContactUs() {
  return (
    <ContactContainer maxWidth="sm">
      <Title variant="h4">Contact Us</Title>
      <Form>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          id="message"
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </SubmitButton>
      </Form>
    </ContactContainer>
  );
}
