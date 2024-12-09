// npm run dev -- --host
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // listen to 127.0.0.1, localhost und 172.23.25.242 (ip eth0 der VM)
    //    host: true, // listen to localhost und der IP der "VM" - aber nicht auf 127.0.0.1
    port: 5173,
    proxy: {
      '/gatekeeper-api/username': {
        target: '???', // hier müsste ich einen existierenden Server eintragen, der im Header dann den Usernamen zurückliefert
        secure: false,
        configure: (proxy, options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            const username = proxyRes.headers['X-Auth-Username'];
            console.log('username', username);
            process.env.VITE_USERNAME = username;
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
        }
      }
    }
  }
})