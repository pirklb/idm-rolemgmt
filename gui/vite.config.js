// npm run dev -- --host
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: '0.0.0.0', // listen to 127.0.0.1, localhost und 172.23.25.242 (ip eth0 der VM)
    //    host: true, // listen to localhost und der IP der "VM" - aber nicht auf 127.0.0.1
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://wipapl22.lkw-walter.com:3001', // hier müsste ich einen existierenden Server eintragen, der im Header dann den Usernamen zurückliefert
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending request to target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            //console.log('Received from Target:', _res.statusCode, _res.headers);
          });
          proxy.on('error', (err, _req, _res) => {
            //console.log('proxy error', err);
          })
        }
      }
    }
  }
})
