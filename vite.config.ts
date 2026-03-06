import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	// base: '/mundial-de-clubes-2029-clasificacion-tabla-de-posiciones-como-van-equipos-conmebol/',
	// base: '/seleccion-peruana-peru-partidos-jugados-goles-estadisticas-convocados-mano-menezes-otros-dt/',
	plugins: [react()],
})
