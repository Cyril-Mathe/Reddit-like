import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server : {
    port: 3030,
    allowedHosts: true
  },
  build: {
    rollupOptions: {
    input: {
    home: '/index.html',
    privacyPolicy: '/pages/privacy-policy.html',
},
},
},
})
