import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import { Link as RouterLink } from 'react-router-dom';

const services = [
  {
    title: 'Compra rapida',
    description: 'Arma tu pedido en minutos con filtros por categoria y stock en tiempo real.',
    icon: BoltRoundedIcon
  },
  {
    title: 'Entrega local',
    description: 'Despachos en el dia para zonas cercanas con seguimiento simple.',
    icon: LocalShippingRoundedIcon
  },
  {
    title: 'Atencion continua',
    description: 'Soporte para cambios, reposiciones y consultas de productos.',
    icon: SupportAgentRoundedIcon
  }
];

const categories = [
  { title: 'Abarrotes', description: 'Arroz, azucar, menestras y basicos de despensa.' },
  { title: 'Bebidas', description: 'Aguas, gaseosas y bebidas para toda la familia.' },
  { title: 'Lacteos', description: 'Leches, yogures y productos refrigerados.' },
  { title: 'Limpieza', description: 'Detergentes, lavavajillas e higiene del hogar.' }
];

export default function Home() {
  return (
    <Stack spacing={2.4}>
      <Box
        sx={{
          p: { xs: 2.4, md: 3.2 },
          borderRadius: 5,
          border: '1px solid',
          borderColor: 'divider',
          background:
            'linear-gradient(145deg, rgba(15,118,110,0.14), rgba(15,118,110,0.04) 40%, rgba(249,115,22,0.18) 120%)'
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: '1.2fr minmax(250px, 420px)' },
            alignItems: 'stretch'
          }}
        >
          <Stack spacing={1.4}>
            <Chip label="Sistema web profesional" color="primary" sx={{ alignSelf: 'flex-start' }} />
            <Typography variant="h3">Mini Market Central</Typography>
            <Typography color="text.secondary">
              Compra productos del dia con una experiencia agil, clara y segura desde cualquier dispositivo.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Button component={RouterLink} to="/catalogo" variant="contained">
                Ir al catalogo
              </Button>
              <Button component={RouterLink} to="/carrito" variant="outlined">
                Ver carrito
              </Button>
            </Stack>
          </Stack>

          <Card className="hover-lift" sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Operacion de tienda
              </Typography>
              <Stack spacing={1.1}>
                <Chip label="Stock y precios actualizados" color="success" variant="outlined" />
                <Chip label="Filtros por categoria y busqueda" color="primary" variant="outlined" />
                <Chip label="Carrito persistente y seguro" color="secondary" variant="outlined" />
                <Chip label="API con respaldo local" color="warning" variant="outlined" />
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 1.4,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }
        }}
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.title} className="hover-lift" sx={{ borderRadius: 4 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'primary.main',
                      color: 'white'
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Typography variant="h6">{service.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack spacing={1.2}>
            <Typography variant="h5">Categorias principales</Typography>
            <Typography variant="body2" color="text.secondary">
              Catalogo enfocado en productos de rotacion diaria para mini market.
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(4, minmax(0, 1fr))'
                }
              }}
            >
              {categories.map((category) => (
                <Box
                  key={category.title}
                  sx={{ p: 1.4, borderRadius: 3, bgcolor: 'rgba(15, 118, 110, 0.08)' }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
