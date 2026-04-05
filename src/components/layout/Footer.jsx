import { Box, Container, Stack, Typography } from '@mui/material';
import { APP_CONFIG } from '../../config/env';

const footerColumns = [
  {
    title: 'Mini Market Central',
    rows: [
      'Compras rapidas para despensa, bebidas y hogar.',
      'Pedidos agiles con atencion digital.'
    ]
  },
  {
    title: 'Horarios',
    rows: ['Lunes a sabado: 7:30 a.m. - 10:00 p.m.', 'Domingos: 8:00 a.m. - 8:00 p.m.']
  },
  {
    title: 'Contacto',
    rows: [APP_CONFIG.supportEmail, APP_CONFIG.supportPhone, 'Atencion por chat en linea']
  }
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 3,
        borderTop: '1px solid rgba(148, 163, 184, 0.25)',
        background:
          'linear-gradient(140deg, rgba(15,23,42,0.98), rgba(30,41,59,0.96) 35%, rgba(15,118,110,0.88) 130%)',
        color: '#d9ebff'
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))'
            }
          }}
        >
          {footerColumns.map((column) => (
            <Stack key={column.title} spacing={0.6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {column.title}
              </Typography>
              {column.rows.map((row) => (
                <Typography key={row} variant="body2" sx={{ color: '#bfd4f2' }}>
                  {row}
                </Typography>
              ))}
            </Stack>
          ))}
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            borderTop: '1px solid rgba(191, 212, 242, 0.22)',
            mt: 2.5,
            pt: 1.5,
            textAlign: 'center',
            color: '#bfd4f2'
          }}
        >
          {`© ${new Date().getFullYear()} Mini Market Central`}
        </Typography>
      </Container>
    </Box>
  );
}
