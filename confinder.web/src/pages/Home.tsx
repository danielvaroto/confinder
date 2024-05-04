import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = (): ReactElement => {
  const navigate = useNavigate();
  const handleListClick = () => navigate('/list');
  const handleMapClick = () => navigate(`/map`);

  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              Sua fonte para pesquisa de qualidade
            </Typography>
            <Typography variant="h5" paragraph>
              Explore a pesquisa de ponta em todas as áreas do conhecimento.
            </Typography>
            <Typography variant="body1" paragraph>
              Encontre sua conferência ideal para obter insights valiosos, fazer networking e
              contribuir para a comunidade científica.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" disableElevation onClick={handleMapClick}>
                Visualizar Mapa
              </Button>
              <Button variant="outlined" disableElevation onClick={handleListClick}>
                Visualizar Listagem
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </>
  );
};
