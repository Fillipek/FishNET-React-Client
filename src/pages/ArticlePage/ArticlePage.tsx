import { useQuery } from '@tanstack/react-query';

import { Button, ListItemText, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { apiUpdateArticle, fetchArticle, getArticleHistory } from 'api';
import { Article, ArticleHistory } from 'api/types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Loader = () => (
  <p>Loading...</p>
);

const ErrorMessage = () => (
  <p>Loading...</p>
);

const PrintArticle = ({ article }: { article: Article }) => {
  return (
    <Stack>
      <Typography variant="h4" component="div">{article.title}</Typography>
      <Divider />
      <Typography sx={{ marginTop: '15px' }} component="p">{article.content}</Typography>
    </Stack>
  )
};

const PrintHistory = ({ history }: { history: ArticleHistory[] }) => {
  if (history.length == 0) {
    return (<Typography sx={{ marginTop: '10px' }}>No history recorded.</Typography>)
  }
  return (
    <Stack>
      <List>
        {history.reverse().map(commit => (
          <Stack>
            <ListItem key={commit.id} disablePadding sx={{ marginTop: '20px' }}>
              <ListItemText>
                <Typography sx={{ fontSize: 12 }}>{String(commit.commitDate)} {String(commit.username)}</Typography>
                <Typography>{String(commit.commitMessage)}</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
          </Stack>
        ))}
      </List>
    </Stack>
  )
};




export const ArticlePage = () => {
  const { id } = useParams();
  const auth = useAuth();
  const { data: article, isLoading, isError, refetch } = useQuery(['product', id], () => fetchArticle(Number(id)))
  const { data: history, isLoading: historyLoading, isError: historyErr, refetch:refetchHistory } = useQuery(["history"], () => (getArticleHistory(Number(id))));
  const [editOpen, setEditOpen] = useState(false)

  function ArticleEditor({ article }: { article: Article }) {
    const defaultValues = {
      id: Number(id),
      title: article.title,
      content: article.content,
      commit: ''
    };
    type FormValues = typeof defaultValues

    const auth = useAuth();
    const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues });
    const [value, setValue] = useState('Controlled');

    const fields = {
      title: register('title', { required: true }),
      content: register('content', { required: true }),
      commit: register('commit', { required: true }),
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    const onSubmit = (values: FormValues) => {
      apiUpdateArticle(values.id, {content:values.content, title:values.title, commit:values.commit}).then(
          (response) => {
            refetch()
            refetchHistory()
          }
      )
      // api update article
      closeEdit()
    };

    function closeEdit () {
      setEditOpen(false)
    }

    return (
      <>
        <Stack padding="20px" spacing={2} component='form' onSubmit={handleSubmit(onSubmit)} onReset={closeEdit}>
          <Typography variant='h4' gutterBottom>Edytuj artykuł</Typography>
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
          <TextField label="Co zostało zmienione" variant="outlined" inputProps={{ ...fields.commit }} />
          <Stack direction="row" spacing={2} justifyContent="center" alignItems='center' flex={1} flexDirection="row">
            <Button type='submit' sx={{ width: '200px' }} variant='contained'>Zapisz</Button>
            <Button type='reset' color='error' sx={{ width: '200px' }} variant='contained'>Anuluj</Button>
          </Stack>
        </Stack>
      </>
    )
  }

  return (
    <Stack >
      <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
        <Stack flex={1} alignItems="center">
          {auth.user && !editOpen &&
            <Stack sx={{ marginTop: "30px" }}>
              <Button sx={{ width: '300px' }} variant='contained' onClick={() => setEditOpen(true)}>Edytuj artykuł</Button>
            </Stack>
          }
          <Paper sx={{ padding: '20px', width: '90%', marginTop: "30px" }}>
            {(isLoading) ? (<Loader />) :
              isError ?
                <ErrorMessage />
                :
                (
                  editOpen ?
                    <ArticleEditor article={article} />
                    :
                    <PrintArticle article={article} />
                )

            }
          </Paper>
        </Stack>

      </Box>

      <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
        <Paper sx={{ padding: '20px', marginTop: '30px', width: '90%' }}>
          <Typography variant='h5'>Historia zmian</Typography>
          <Divider />
          {(historyLoading) ? (
            <Loader />
          ) : (
            historyErr ? (
              <ErrorMessage />
            ) : (
              <PrintHistory history={history} />
            )
          )}
        </Paper>
      </Box>
    </Stack>
  )
}

export default ArticlePage;