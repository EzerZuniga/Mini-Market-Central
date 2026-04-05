import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import CategoryFilter from '../components/features/CategoryFilter';
import ProductCard from '../components/features/ProductCard';
import Button from '../components/common/Button';
import { useProducts } from '../hooks/useProducts';
import { applyProductFilters } from '../utils/filters';

export default function Shop() {
  const { products, categories, loading, error, source, reload } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredProducts = useMemo(
    () =>
      applyProductFilters(products, {
        category: selectedCategory,
        query: searchTerm,
        onlyInStock
      }),
    [products, selectedCategory, searchTerm, onlyInStock]
  );

  return (
    <Stack spacing={1.6}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack spacing={1.3}>
            <Typography variant="h4">Catalogo de productos</Typography>
            <Typography color="text.secondary">
              Explora el inventario por categoria y disponibilidad en tiempo real.
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2}>
              <TextField
                fullWidth
                type="search"
                value={searchTerm}
                placeholder="Buscar por nombre, marca o descripcion"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={onlyInStock}
                    onChange={(event) => setOnlyInStock(event.target.checked)}
                  />
                }
                label="Solo disponibles"
                sx={{
                  m: 0,
                  px: 1.3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  minHeight: 56
                }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gap: 1.4,
          gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
          alignItems: 'start'
        }}
      >
        <Stack spacing={1}>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack spacing={1.1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Fuente de datos
                </Typography>
                <Chip
                  label={source === 'remote' ? 'API remota activa' : 'Modo respaldo local'}
                  color={source === 'remote' ? 'success' : 'warning'}
                  variant="outlined"
                />
                <Button variant="secondary" onClick={reload}>
                  Recargar catalogo
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Stack spacing={1.1}>
          {loading && (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={20} />
              <Typography color="text.secondary">Cargando productos...</Typography>
            </Stack>
          )}

          {!loading && error && (
            <Alert severity="warning">{`No se pudo conectar a la API: ${error}`}</Alert>
          )}

          {!loading && !filteredProducts.length && (
            <Alert severity="info">No hay resultados para el filtro actual.</Alert>
          )}

          <Box
            sx={{
              display: 'grid',
              gap: 1.2,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                xl: 'repeat(3, minmax(0, 1fr))'
              }
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
