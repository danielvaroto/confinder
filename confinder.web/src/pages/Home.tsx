import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MapIcon from '@mui/icons-material/Map';
import { Box, Button, Container, Grid, Paper,Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = (): ReactElement => {
  const navigate = useNavigate();
  const handleListClick = () => navigate('/list');
  const handleMapClick = () => navigate(`/map`);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Sua fonte para pesquisa de qualidade
            </Typography>
            <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary' }}>
              Explore conferências acadêmicas em todas as áreas da Computação
            </Typography>
            <Typography variant="body1" paragraph>
              Encontre sua conferência ideal para:
            </Typography>
            <Box component="ul" sx={{ mb: 4 }}>
              <Typography component="li" variant="body1">
                Obter insights valiosos nas principais áreas da computação
              </Typography>
              <Typography component="li" variant="body1">
                Fazer networking com pesquisadores e profissionais
              </Typography>
              <Typography component="li" variant="body1">
                Contribuir para o avanço da ciência e tecnologia
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                disableElevation
                onClick={handleMapClick}
                startIcon={<MapIcon />}
              >
                Visualizar Mapa
              </Button>
              <Button
                variant="outlined"
                size="large"
                disableElevation
                onClick={handleListClick}
                startIcon={<FormatListBulletedIcon />}
              >
                Visualizar Listagem
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Áreas em Destaque
            </Typography>
            <Grid container spacing={2}>
              {[
                'Inteligência Artificial',
                'Engenharia de Software',
                'Segurança',
                'Redes',
                'Banco de Dados',
                'Computação Gráfica',
                'Interação Humano-Computador',
                'Robótica'
              ].map((area) => (
                <Grid item xs={6} key={area}>
                  <Typography variant="body2" color="text.secondary">
                    • {area}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
