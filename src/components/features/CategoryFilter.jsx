import { Box, Stack, Typography } from '@mui/material';
import Button from '../common/Button';

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h6" sx={{ mb: 1.4 }}>
        Categorias
      </Typography>
      <Stack spacing={0.8}>
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
          onClick={() => onSelectCategory('all')}
          sx={{ justifyContent: 'flex-start' }}
        >
          Todas
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'ghost'}
            onClick={() => onSelectCategory(category)}
            sx={{ justifyContent: 'flex-start' }}
          >
            {category}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
