import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Keit-portfolio/',
  server: {
    host: true // Thêm dòng này để cho phép điện thoại truy cập
  }
})
