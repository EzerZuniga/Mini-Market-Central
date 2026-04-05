import Chip from '@mui/material/Chip';

const colorMap = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  danger: 'error'
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <Chip
      label={children}
      color={colorMap[variant] || 'default'}
      size="small"
      className={className}
      variant={variant === 'default' ? 'outlined' : 'filled'}
    />
  );
}
