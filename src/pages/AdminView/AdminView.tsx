import { useQuery } from '@tanstack/react-query';

import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { adminDeleteUser, adminUpdateUser, fatchArticleTitles, fetchAllUsers } from 'api';
import { ArticleTitle } from "api/types";
import { User } from "./types"
import { Link, Navigate } from "react-router-dom";
import useAuth from 'hooks/useAuth';
import { UserRole } from 'providers/AuthProvider/constants';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Loader = () => (
    <p>Loading...</p>
);

const ErrorMessage = () => (
    <p>Loading...</p>
);

type ButtonClickCallbacks = {
    callback: React.Dispatch<React.SetStateAction<string>>,
    id: number,
    idSetter: React.Dispatch<React.SetStateAction<number | null>>
}

function mapRole(role?: string) {
    switch (role) {
        case "ADMIN": return "Administator"
        case "USER": return "Użytkownik"
        default: Error("unknown role")
    }
}

const defaultValues: User = {
    id: -1,
    username: "",
    email: "",
    role: UserRole.Guest
}

const AdminView = () => {
    const { data: users, isLoading: usersLoading, isError: usersError, refetch } = useQuery(['users'], fetchAllUsers);
    const [userAction, setUserAction] = useState("none")
    const [currentActionId, setCurrentActionId] = useState(-1)
    const auth = useAuth();

    const { handleSubmit, register, formState: { errors }, setValue } = useForm({ defaultValues });

    const fields = {
        id: register('id', { required: true }),
        username: register('username', { required: true }),
        email: register('email', { required: true }),
        role: register('role', { required: true }),
    }

    const onSubmit = (values: User) => {
        setUserAction("none")
        setCurrentActionId(-1)
        adminUpdateUser(values).then(
            () => refetch()
        )
    };

    const [role, setRole] = useState(defaultValues ? defaultValues.role : UserRole.Guest);

    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as UserRole);
    };

    const UserUpdateForm = (defaultValues?: User) => {
        return (
            <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
                <Paper sx={{ padding: '20px' }} >
                    <Stack spacing={2} component='form' onReset={() => setUserAction("none")} onSubmit={handleSubmit(onSubmit)} >
                        <Typography variant='h4' gutterBottom>Edytuj dane użytkownika</Typography>
                        <TextField label="Id" variant="outlined" disabled={true} inputProps={{ ...fields.id }}/>
                        <TextField label="Nazwa użytkownika" variant="outlined" inputProps={{ ...fields.username }}/>
                        <TextField label="Email" variant="outlined" inputProps={{ ...fields.email }}/>
                        <FormControl fullWidth>
                            <InputLabel id="role-select-label" >Rola</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="role-select"
                                value={role}
                                label="Rola"
                                inputProps={{ ...fields.role }}
                                onChange={handleChange}
                            >
                                <MenuItem value={UserRole.Admin}>Administator</MenuItem>
                                <MenuItem value={UserRole.Guest}>Użytkownik</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack spacing={2} direction='row' justifyContent='center'>
                            <Button type='submit' sx={{ width: '150px' }} variant='contained'>Zatwierdź</Button>
                            <Button type='reset' sx={{ width: '150px' }} color="error" variant='contained'>Anuluj</Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        )
    }

    const UserTable = ({ users }: { users: User[] }) => {


        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px' }}>ID</TableCell>
                            <TableCell sx={{ fontSize: '18px' }}>Nazwa Użytkownika</TableCell>
                            <TableCell sx={{ fontSize: '18px' }}>Email</TableCell>
                            <TableCell sx={{ fontSize: '18px' }}>Rola</TableCell>
                            <TableCell sx={{ fontSize: '18px' }} align="right" >Akcja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell >{user.id}</TableCell>
                                    <TableCell >{user.username}</TableCell>
                                    <TableCell >{user.email}</TableCell>
                                    <TableCell >{mapRole(user.role)}</TableCell>

                                    {userAction == "none" || currentActionId == user.id ?
                                        <TableCell >
                                            {userAction == "none" ?
                                                <Stack justifyContent="right" direction="row">
                                                    {
                                                        auth.user?.id != user.id &&
                                                        <>
                                                    <Button onClick={() => { 
                                                        setUserAction("edit")
                                                        setCurrentActionId(user.id)
                                                        setValue("id", user.id)
                                                        setValue("username", user.username)
                                                        setValue("email", user.email)
                                                        setValue("role", user.role)
                                                    }}>Edytuj</Button>
                                                    
                                                        <Button onClick={() => { setUserAction("delete"); setCurrentActionId(user.id) }} color="error">Usuń</Button>
                                                        </>
                                                    }
                                                </Stack>
                                                : userAction == "edit" ?
                                                    <Stack justifyContent="right" direction="row">

                                                    </Stack>
                                                    :
                                                    <Stack justifyContent="right" direction="row">
                                                        <Button onClick={() => { setUserAction("none"); setCurrentActionId(-1); adminDeleteUser(user.id).then(() => refetch()) }} color="success">Potwierdź</Button>
                                                        <Button onClick={() => { setUserAction("none"); setCurrentActionId(-1) }} color="error">Anuluj</Button>
                                                    </Stack>
                                            }
                                        </TableCell>
                                        :
                                        <TableCell></TableCell>
                                    }
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <Stack margin="50px" alignItems='center' justifyContent="center" flex={1} flexDirection="column" spacing={5}>

            {userAction == "edit" && UserUpdateForm(defaultValues)}

            <Stack width="80%">
                {(!auth.user || auth.user.role != UserRole.Admin) && <Navigate to="/" />}
                {usersLoading ? <Loader /> : usersError ? <ErrorMessage /> :
                    <UserTable users={users} />
                }
            </Stack>

        </Stack>
    )
}

export default AdminView;
