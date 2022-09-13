import { useQuery } from '@tanstack/react-query';

import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import { fatchArticleTitles } from 'api';
import { ArticleTitle } from "api/types";
import { Link } from "react-router-dom";
import useAuth from 'hooks/useAuth';

const Loader = () => (
  <p>Loading...</p>
);

const ErrorMessage = () => (
  <p>Loading...</p>
);

const ListTitles = ({ titles }: { titles: ArticleTitle[] }) => {
  return (
    <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List>
          {titles.map(titleItem => (
            <ListItem key={titleItem.id} disablePadding>
              <ListItemButton component={Link} to={"/encyclopedia/" + titleItem.id}>{titleItem.title}</ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Stack>
  )
}

const Encyclopedia = () => {
  const { data: titles, isLoading, isError } = useQuery(['titles'], fatchArticleTitles);
  const auth = useAuth();

  return (
    <div>
      <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
        <Paper sx={{ padding: '20px', marginTop: '100px', width: '80%' }}>
        <Typography align='center' variant="h3" component="div">Encyklopedia</Typography>
          {auth.user && 
            <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
              <Button sx={{ margin: '20px' }} variant='contained' component={Link} to="/encyclopedia/create">Utwórz nowy artykuł</Button>
            </Stack>
          }
          
          <Typography align='center' variant="h5" component="div">Przeglądaj artykuły</Typography>
          <Divider />
          {(isLoading) ? (
            <Loader />
          ) : (
            isError ? (
              <ErrorMessage />
            ) : (
              <ListTitles titles={titles} />
            )
          )}
        </Paper>
      </Stack>
    </div>
  )
}

export default Encyclopedia;
