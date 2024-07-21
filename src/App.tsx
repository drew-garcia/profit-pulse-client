import CandlestickChartIcon from '@mui/icons-material/CandlestickChart'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


function App() {
  return (
    <>
        <Container fixed className={'h-screen'}>
            <Box className={'h-full flex justify-center items-center'}>
                <CandlestickChartIcon sx={{ fontSize: 250 }} color={'primary'} />
            </Box>
        </Container>
    </>
  )
}

export default App
