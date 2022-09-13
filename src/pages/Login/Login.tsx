import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import useAuth from 'hooks/useAuth';
import { Navigate } from "react-router-dom";

const defaultValues = {
  username: '',
  password: '',
};

type LoginFormValues = typeof defaultValues;

function Login () {
  const auth = useAuth();
  const {handleSubmit, register, formState: {errors}} = useForm({defaultValues});

  const fields = {
    username: register('username', {required: true, minLength: 3}),
    password: register('password', {required: true, minLength: {value: 3, message: "Password too short"}}),
  }

  const onSubmit = (values: LoginFormValues) => {
    auth.login(values)
  };

  return (
    <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
      <Paper sx={{padding: '20px', marginTop: '100px', width: '400px'}} elevation={5}>
        <Stack spacing={2} component='form' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h4' gutterBottom>Zaloguj się</Typography>
          <TextField label="Nazwa użytkownika" variant="outlined" inputProps={{...fields.username}} />
          <TextField label="Hasło" type="password" variant="outlined" inputProps={{...fields.password}} />
          {errors.password && <Typography>{errors.password.message}</Typography>}
          {auth.user && <Navigate to='/'/>}
          <Button type='submit' variant='contained'>Zaloguj się</Button>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default Login