import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
// import { resolve } from 'path'

export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, 'src')
  //   },
  //   extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx']
  // },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  define: {
    'process.env': { ...process.env }
  },
  server: {
    host: 'localhost',
    port: 8080,
    // proxy: {
    //   '/apis': {
    //     target: 'http://localhost:8080',
    //     ws: true,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/apis/, '')
    //   }
    // }
  },
})
