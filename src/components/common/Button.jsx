import MuiButton from '@mui/material/Button';

const variantConfig = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'contained', color: 'secondary' },
  ghost: { variant: 'outlined', color: 'inherit' }
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ...rest
}) {
  const config = variantConfig[variant] || variantConfig.primary;

  return (
    <MuiButton
      type={type}
      onClick={onClick}
      variant={config.variant}
      color={config.color}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {children}
    </MuiButton>
  );
}
