# Mini Market Central

Aplicacion web de mini market desarrollada con React + Vite.
Incluye catalogo con integracion API (`axios`), respaldo local, carrito persistente y una interfaz moderna con Material UI.

## Stack
- React 18
- React Router DOM 6
- Material UI 7 + Emotion
- Axios
- PayPal JS SDK (pago en linea)
- Node + Express (API de pagos)
- Vite 5

## Funcionalidades
- Catalogo con filtros por categoria, busqueda y control de stock.
- Consumo de API con capa de servicios (`src/services`).
- Fallback local automatico si falla la API externa.
- Carrito global con Context + Reducer y persistencia en `localStorage`.
- Vista de detalle de producto y asistente de ayuda en linea.
- Diseno responsive con animaciones suaves y carga diferida de rutas.
- Flujo de pago en peruano con metodos: PayPal/tarjeta, Yape/Plin y contra entrega.
- Integracion real con PayPal Orders API (creacion y captura de orden).

## Estructura
```text
src/
  app/              # Rutas y providers
  components/       # UI comun, layout y features
  config/           # Configuracion de entorno/app
  context/          # Estado global (carrito)
  data/             # Datos de respaldo local
  hooks/            # Hooks de datos
  pages/            # Vistas de negocio
  services/         # Cliente HTTP y servicios API
  theme/            # Tema global Material UI
  utils/            # Formateadores y filtros
server/
  index.js          # Punto de entrada del backend
  api/
    routes/         # Rutas HTTP (pagos, health)
    services/       # Integraciones externas (PayPal)
    utils/          # Normalizacion y utilidades
```

## Ejecucion local
```bash
npm install
npm run server
npm run dev
```

`npm run server` levanta la API de pagos en `http://localhost:8787`.
`npm run dev` levanta el frontend en `http://localhost:5173`.

Ruta de pago:
```text
/pago
```

Build de produccion:
```bash
npm run build
npm run preview
```

## Variables de entorno
Copia `.env.example` a `.env` y configura:

```bash
# Frontend
VITE_API_BASE_URL=https://dummyjson.com
VITE_PAYMENTS_API_BASE_URL=

# Backend
PORT=8787
PAYPAL_ENV=sandbox
PAYPAL_CURRENCY=PEN
PAYPAL_CLIENT_ID=tu_client_id
PAYPAL_CLIENT_SECRET=tu_client_secret
CORS_ORIGIN=http://localhost:5173
```

## Estado actual
- Build validada correctamente con `npm run build`.
- Pago en Peru listo con metodos locales + PayPal (requiere credenciales validas para PayPal).
