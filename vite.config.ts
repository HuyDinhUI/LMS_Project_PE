import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // cho phép truy cập từ mạng ngoài
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '2d32d8a9cad8.ngrok-free.app' // thêm domain ngrok vào đây
    ]
  },
  
})
