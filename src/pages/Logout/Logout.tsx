import useAuth from 'hooks/useAuth';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Logout() {
    const auth = useAuth()
    auth.logout()
    return (
        <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
            <Paper sx={{ padding: '20px', marginTop: '100px', width: '400px', }} elevation={5}>
                <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
                    <Typography>Pomyślnie wylogowano.</Typography>
                    <Button sx={{ marginTop: '15px', width: '50%' }} variant='contained' component={Link} to="/">Strona główna</Button>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default Logout