import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import useAuth from 'hooks/useAuth';
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import { Box } from '@mui/material';
import { apiPostArticle } from 'api';
import { useNavigate } from 'react-router-dom';

const defaultValues = {
    title: '',
    content: '',
};
type FormValues = typeof defaultValues

function NewArticle() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues });
    const [value, setValue] = useState('Controlled');

    const fields = {
        title: register('title', { required: true }),
        content: register('content', { required: true }),
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onSubmit = (values: FormValues) => {
        apiPostArticle(values.title, values.content).then(
            (response) => {
                navigate('/encyclopedia/' + response.id)
            }
        )
    };

    return (
        <>
        {!auth.user && <Navigate to="/login" />}
        <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
            <Paper sx={{ padding: '20px', marginTop: '50px', width: '80%' }} elevation={5}>
                <Stack spacing={2} component='form' onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='h4' gutterBottom>Utwórz nowy artykuł</Typography>
                    <TextField label="Tytuł" variant="outlined" inputProps={{ ...fields.title }} />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Treść artykułu"
                        multiline
                        maxRows={100}
                        minRows={5}
                        onChange={handleChange}
                        inputProps={{ ...fields.content }}
                    />
                    <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
                        <Button type='submit' sx={{ width: '50%' }} variant='contained'>Zapisz</Button>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
        </>
    )
}

export default NewArticle