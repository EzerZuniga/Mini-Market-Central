import { useState } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Button from '../components/common/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box sx={{ minHeight: { xs: 'auto', md: '58vh' }, display: 'grid', placeItems: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 480, borderRadius: 5 }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Stack component="form" spacing={1.2} onSubmit={handleSubmit}>
            <Typography variant="h4">Ingreso de clientes</Typography>
            <Typography color="text.secondary">
              Accede para guardar direcciones y revisar historial de pedidos.
            </Typography>

            <TextField
              label="Correo"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="cliente@correo.com"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailRoundedIcon fontSize="small" color="action" />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Contrasena"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon fontSize="small" color="action" />
                  </InputAdornment>
                )
              }}
            />

            {submitted ? (
              <Alert severity="success">
                Modulo de autenticacion listo para conectar con backend.
              </Alert>
            ) : null}

            <Button type="submit">Ingresar</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
