import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import FileUpload from './components/FileUpload/FileUpload';
import PrivateRoute from './utils/PrivateRoute';

const defaultPage = (
  <Container fixed className='h-screen'>
    <Box className='h-full flex justify-center items-center'>
      <CandlestickChartIcon sx={{ fontSize: 250 }} color='primary' />
    </Box>
  </Container>
);

const dashboard = <h1>Dashboard</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />{' '}
        <Route
          path='/dashboard'
          element={<PrivateRoute element={dashboard} fallback={<Navigate to='/login' />} />}
        />
        <Route
          path='/file-upload'
          element={<PrivateRoute element={<FileUpload />} fallback={<Navigate to='/login' />} />}
        />
        <Route path='/' element={<PrivateRoute element={dashboard} fallback={defaultPage} />} />
      </Routes>
    </Router>
  );
}

export default App;
