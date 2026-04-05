import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

export default function CartConfirmation() {
  const { items, lastAddedAt, lastAddedId, total } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAddedAt) {
      return;
    }
    setVisible(true);
  }, [lastAddedAt]);

  const recentlyAdded = useMemo(() => {
    if (!items.length) {
      return null;
    }
    return items.find((item) => item.id === lastAddedId) || items[items.length - 1];
  }, [items, lastAddedId]);

  if (!recentlyAdded) {
    return null;
  }

  return (
    <Snackbar
      open={visible}
      autoHideDuration={3500}
      onClose={() => setVisible(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <MuiAlert
        onClose={() => setVisible(false)}
        severity="success"
        variant="filled"
        sx={{ width: '100%', alignItems: 'center' }}
        action={
          <Button component={RouterLink} to="/carrito" color="inherit" size="small">
            Ver carrito
          </Button>
        }
      >
        {`${recentlyAdded.name} agregado. Total: ${formatCurrency(total)}`}
      </MuiAlert>
    </Snackbar>
  );
}
