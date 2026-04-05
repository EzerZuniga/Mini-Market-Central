import { Stack, Typography } from '@mui/material';
import Badge from '../common/Badge';
import { getInventoryStatus } from '../../utils/inventoryHelpers';

export default function InventoryStatus({ stock }) {
  const status = getInventoryStatus(stock);

  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
      <Badge variant={status.variant}>{status.label}</Badge>
      <Typography variant="caption" color="text.secondary">
        {`${Math.max(0, stock)} unidades`}
      </Typography>
    </Stack>
  );
}
