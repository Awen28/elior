import path from "path"
import react from "@vitejs/plugin-react"
import vike from 'vike/plugin'
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command, isSsrBuild }) => ({
  base: '/',
  plugins: [
    ...(command === 'serve' ? [inspectAttr()] : []),
    react(),
    vike(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages-registry": path.resolve(
        __dirname,
        isSsrBuild ? "./src/routes/pagesServer.tsx" : "./src/routes/pages.tsx"
      ),
    },
  },
}));
