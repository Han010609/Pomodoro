import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig(({ mode }) => {
  // 加載環境變數
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],
    define: {
      // 正確載入環境變數，避免覆蓋原本的 Vite 變數
      'import.meta.env': {
        ...process.env,
        ...env,
      },
    },
    // 設定路徑別名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // 別名設置
      },
    },
    server: {
      port: 3000, // 自訂開發伺服器埠號
      open: true, // 啟動時自動開啟瀏覽器
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/tailwind.css";`, // 全域樣式引入
        },
      },
    },
  }});
