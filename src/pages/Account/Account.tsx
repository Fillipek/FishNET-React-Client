import useAuth from 'hooks/useAuth';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import { Box, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { updateUserData } from 'api';
import { useForm } from 'react-hook-form';

function mapRole(role?: string) {
    switch (role) {
        case "ADMIN": return "Administator"
        case "USER": return "Użytkownik"
        default: Error("unknown role")
    }
}



function Account() {
    const auth = useAuth();

    const defaultValues = {
        username: auth.user ? auth.user.username : '',
        email: auth.user ? auth.user.email : '',
    };
    type UserUpdateValues = typeof defaultValues;

    const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues });

    const fields = {
        username: register('username', { required: true }),
        email: register('email', { required: true }),
    }

    const [usernameEdit, setUsernameEdit] = useState(false)
    const [usernameErr, setUsernameErr] = useState(false)

    const onUsernameEditClick = () => setUsernameEdit(true);
    const cancelUsernameEdit = () => setUsernameEdit(false);
    const submitUsernameEdit = (values: UserUpdateValues) => {
        if (auth.user) {
            try {
                updateUserData(values);
                setUsernameErr(false);
                auth.user.username = values.username
            } catch {
                setUsernameErr(true);
            }
            setEmailEdit(false);
        }
    }

    const [emailEdit, setEmailEdit] = useState(false)
    const [emailErr, setEmailErr] = useState(false)

    const onEmailEditClick = () => setEmailEdit(true);
    const cancelEmailEdit = () => {setEmailErr(false); setEmailEdit(false)};
    const submitEmailEdit = (values: UserUpdateValues) => {
        if (auth.user) {
            try {
                updateUserData(values);
                setEmailErr(false);
                auth.user.email = values.email
            } catch {
                setEmailErr(true);
            }
            setEmailEdit(false);
        }
    }



    const Item = styled(Typography)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
    }));

    return (
        <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
            {(!auth.user || auth.user == undefined) && <Navigate to="/login" />}
            <Paper sx={{ padding: '20px', marginTop: '30px', width: '90%', }} >
                <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
                    <Typography variant="h5" sx={{ margin: '15px' }}>Przegląd Konta Użytkownika</Typography>
                    <Paper sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <List>
                            <ListItem>
                                <Item sx={{ fontSize: 12 }}>Nazwa użytkownika</Item>
                                {/* {!usernameEdit ? */}
                                    <Stack direction="row" spacing={1}>
                                        <Item>{auth.user?.username}</Item>
                                        {/* <Button sx={{ fontSize: 12 }} onClick={onUsernameEditClick}>Zmień</Button> */}
                                    </Stack>
                                    {/* :
                                    <Stack direction="row" spacing={1} component='form' onSubmit={handleSubmit(submitUsernameEdit)} onReset={cancelUsernameEdit}>
                                        <TextField defaultValue={auth.user?.username} size='small' inputProps={{ ...fields.username }} />
                                        <Button type='submit' sx={{ fontSize: 12 }}>Zatwierdź</Button>
                                        <Button type='reset' sx={{ fontSize: 12 }} color='error'>Anuluj</Button>
                                    </Stack> */}
                                {/* } */}
                            </ListItem>
                            <ListItem>
                                <Item sx={{ fontSize: 12 }}>Email</Item>
                                {!emailEdit ?
                                    <Stack direction="row" spacing={1}>
                                        <Item>{auth.user?.email}</Item>
                                        <Button sx={{ fontSize: 12 }} onClick={onEmailEditClick}>Zmień</Button>
                                        {emailErr && <Item color={'red'}>Niepowodzenie</Item>}
                                    </Stack>
                                    :
                                    <Stack direction="row" spacing={1} component='form' onSubmit={handleSubmit(submitEmailEdit)} onReset={cancelEmailEdit}>
                                        <TextField defaultValue={auth.user?.email} size='small' inputProps={{ ...fields.email }} />
                                        <Button type='submit' sx={{ fontSize: 12 }}>Zatwierdź</Button>
                                        <Button type='reset' sx={{ fontSize: 12 }} color='error'>Anuluj</Button>
                                        {emailErr && <Item color={'red'}>Niepowodzenie</Item>}
                                    </Stack>
                                }
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Stack direction="row" spacing={1}>
                                        <Item sx={{ fontSize: 12 }}>Rola</Item>
                                        <Item>{mapRole(auth.user?.role)}</Item>
                                    </Stack>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Paper>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default Account