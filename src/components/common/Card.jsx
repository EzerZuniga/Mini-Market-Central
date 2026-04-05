import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Card({ children, className = '', sx = {} }) {
  return (
    <MuiCard className={className} sx={sx}>
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
}
