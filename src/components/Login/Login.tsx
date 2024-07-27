import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import LOGIN_MUTATION from './loginMutation';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateEmail = (emailToValidate: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailToValidate);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setFormError('Invalid email format');
      return;
    }

    try {
      const result = await login({ variables: { email, password } });
      if (result.data?.login?.token) {
        localStorage.setItem('token', result.data.login.token);
        setSuccess('Login successful');
        setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
      } else {
        setFormError('Incorrect email or password');
      }
    } catch (loginError) {
      setFormError('Incorrect email or password');
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Login
        </Typography>
        <Box component='form' onSubmit={handleSubmit} role='form' sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(formError) && formError === 'Invalid email format'}
            helperText={
              Boolean(formError) && formError === 'Invalid email format'
                ? 'Invalid email format'
                : ''
            }
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {formError && (
            <Alert severity='error' sx={{ width: '100%' }}>
              {formError}
            </Alert>
          )}
          {error && (
            <Alert severity='error' sx={{ width: '100%' }}>
              {error.message}
            </Alert>
          )}
          {success && (
            <Alert severity='success' sx={{ width: '100%' }}>
              {success}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
