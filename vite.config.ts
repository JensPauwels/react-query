import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    // hmr: {
    //     host: 'userv2.bluecherry.local',
    //     port: 3000,
    //     protocol: 'wss'
    //   }
  },

});
