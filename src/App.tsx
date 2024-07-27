import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';

const defaultPage = (
  <Container fixed className='h-screen'>
    <Box className='h-full flex justify-center items-center'>
      <CandlestickChartIcon sx={{ fontSize: 250 }} color='primary' />
    </Box>
  </Container>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={defaultPage} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
