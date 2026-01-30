
# Mini-Market-Central

Aplicación web moderna (frontend) que simula una tienda multidepartamento sostenible, con catálogo de productos, carrito de compras, filtros, chat y reglas de negocio. Construida con React y Vite.

## Características principales
- Catálogo de productos con información detallada y stock
- Carrito de compras funcional y persistente
- Filtros por categoría y búsqueda
- Chat de atención al cliente (ChatNuna)
- Indicadores de inventario y badges
- Diseño responsive y componentes reutilizables

## Instalación y uso
```bash
# Clona el repositorio
git clone https://github.com/EzerZuniga/Mini-Market-Central.git
cd NUNA-Smart-Storefront

# Instala dependencias
npm install

# Ejecuta en modo desarrollo
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Scripts disponibles
- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Genera la build de producción
- `npm run preview` — Previsualiza la build

## Estructura del proyecto

```
src/
	App.jsx           # Componente principal
	main.jsx          # Punto de entrada
	styles.css        # Estilos globales
	components/       # Componentes reutilizables
	context/          # Contextos globales (ej. carrito)
	data/             # Mock de datos
	pages/            # Vistas principales
	utils/            # Utilidades y helpers
```

## Dependencias principales
- React 18
- React Router DOM 6
- Vite 5

## Contribución
¡Las contribuciones son bienvenidas! Por favor, abre un issue o pull request siguiendo las plantillas del repositorio.

## Licencia
MIT
