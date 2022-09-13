import { useQuery } from '@tanstack/react-query';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from "hooks/useAuth";

import {Link} from "react-router-dom";
import { UserRole } from 'providers/AuthProvider/constants';
import { Stack } from '@mui/material';

const Navbar = () => {
  const auth = useAuth();

  const publicLinks = [
    <Button key={1} color="inherit" component={Link} to="/">Strona Główna</Button>,
    <Stack sx={{ flexDirection:'row', flexGrow:1, justifyContent:"left" }}>
      <Button key={2} color="inherit"  component={Link} to="/encyclopedia">Encyklopedia</Button>
    </Stack>,
    <Button key={3} color="inherit" component={Link} to="/login">Logowanie</Button>,
    <Button key={4} color="inherit" component={Link} to="/register">Rejestracja</Button>,
  ];

  const userLinks = [
    <Button key={1} color="inherit" component={Link} to="/">Strona Główna</Button>,
    <Stack sx={{ flexDirection:'row', flexGrow:1, justifyContent:"left" }}>
      <Button key={2} color="inherit"  component={Link} to="/encyclopedia">Encyklopedia</Button>
    </Stack>,
    <Button key={3} color="inherit" component={Link} to="/account">Konto</Button>,
    <Button key={4} color="inherit" component={Link} to="/logout">Wyloguj</Button>,
  ];

  const adminLinks = [
    <Button key={1} color="inherit" component={Link} to="/">Strona Główna</Button>,
    <Stack sx={{ flexDirection:'row', flexGrow:1, justifyContent:"left" }}>
      <Button key={2} color="inherit"  component={Link} to="/encyclopedia">Encyklopedia</Button>
    </Stack>,
    <Button key={3} color="inherit" component={Link} to="/account">Konto</Button>,
    <Button key={4} color="inherit" component={Link} to="/admin">Panel Administacyjny</Button>,
    <Button key={5} color="inherit" component={Link} to="/logout">Wyloguj</Button>,
    
  ]

  return (
    <AppBar position="static">
      <Toolbar>
      <Button key={0} color="inherit" component={Link} to="/"><Typography variant='h5'>FishNET</Typography></Button>
        {auth.user ? (auth.user.role == UserRole.Admin ? adminLinks : userLinks) : publicLinks}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
