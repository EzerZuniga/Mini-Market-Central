import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

function buildReply(message, total) {
  const normalized = message.toLowerCase();

  if (normalized.includes('envio') || normalized.includes('envío')) {
    return 'Entregamos el mismo dia en zonas cercanas y al dia siguiente para cobertura distrital.';
  }

  if (normalized.includes('pago')) {
    return 'Aceptamos tarjeta con PayPal, Yape, Plin y pago contra entrega en zonas habilitadas del Peru.';
  }

  if (normalized.includes('horario')) {
    return 'Atendemos de lunes a sabado de 7:30 a.m. a 10:00 p.m. y domingos hasta las 8:00 p.m.';
  }

  if (normalized.includes('carrito') || normalized.includes('total')) {
    return `El total actual de tu carrito es ${formatCurrency(total)}.`;
  }

  return 'Puedo ayudarte con horarios, metodos de pago, cobertura de entrega y estado de tu carrito.';
}

export default function ChatNuna() {
  const { total } = useCart();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hola, soy CentralBot. Te ayudo con envios, pagos, horarios y tu pedido.'
    }
  ]);

  const quickQuestions = useMemo(
    () => ['Horarios de atencion', 'Metodos de pago', 'Cobertura de envio'],
    []
  );

  const sendMessage = (customText) => {
    const outgoing = (customText || input).trim();
    if (!outgoing) {
      return;
    }

    const reply = buildReply(outgoing, total);
    setMessages((current) => [
      ...current,
      { sender: 'user', text: outgoing },
      { sender: 'bot', text: reply }
    ]);
    setInput('');
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: 1200 }}
        aria-label="Abrir chat de ayuda"
      >
        <ChatRoundedIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Asistente Mini Market Central</Typography>
            <Button onClick={() => setOpen(false)} aria-label="Cerrar chat">
              <CloseRoundedIcon />
            </Button>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ display: 'grid', gridTemplateRows: '1fr auto auto', gap: 1.4, minHeight: 430 }}>
          <Stack spacing={1} sx={{ overflowY: 'auto', maxHeight: { xs: 260, md: 320 }, pr: 0.5 }}>
            {messages.map((message, index) => (
              <Box
                key={`${message.sender}-${index}`}
                sx={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                  color: message.sender === 'user' ? 'white' : 'text.primary',
                  px: 1.4,
                  py: 0.9,
                  borderRadius: 2.5,
                  maxWidth: '90%'
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
              </Box>
            ))}
          </Stack>

          <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap">
            {quickQuestions.map((question) => (
              <Chip
                key={question}
                label={question}
                onClick={() => sendMessage(question)}
                clickable
                variant="outlined"
              />
            ))}
          </Stack>

          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              size="small"
              value={input}
              placeholder="Escribe tu consulta"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
            <Button variant="contained" onClick={() => sendMessage()}>
              Enviar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
