import { Button, ListItemText, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';


const Home = () => {
  return (
    <Stack paddingTop="200px" alignItems="center" justifyContent="center">
      <Paper elevation={5}>
        <Stack paddingX="200px" paddingY="50px" alignItems="center" justifyContent="center">
          <Typography margin="10px" variant='h1'>FishNET</Typography>
          <Typography variant="h4" margin="10px">Najbardziej rozbudowany atlas ryb</Typography>
          <Stack marginTop="20px" width="90%" justifyItems="center" direction="row">
            <Typography flex={1} fontSize={18} color='GrayText'>Marcin F.</Typography>
            <Typography fontSize={18} color='GrayText'>2022</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default Home;
