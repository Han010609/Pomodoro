```
src/
├─ assets/            # 存放靜態資源 (圖片、聲音等)
├─ components/        # UI 元件 (例如 Timer, TodoList, Analytics 等)
│    ├─ Analytics.vue # 三選單之一 圖表(紀錄 當日跟當週使用狀況)
│    ├─ Ringtone.vue  # 三選單之一 鈴聲設定(包含音量大小)
│    ├─ Timer.vue
│    └─ TodoList.vue  # 三選單之一 代辦清單
├─ views/             # 主要頁面 (Home, Settings, Login 等)
│    ├─ HomeView.vue  # 主畫面
│    ├─ SettingView.vue # 設定頁畫面
│    ├─ TotatoView.vue # 角色圖鑑畫面
│    └─ LoginView.vue  # 登入頁面 or 使用者資料
├─ router/            # 路由相關檔案
│    └─ index.ts      # 路由入口檔案
├─ store/             # 狀態管理 (例如 pinia 或 vuex)
├─ utils/             # 工具方法 (例如時間格式轉換、音效處理)
├─ App.vue            # 根組件
├─ main.ts            # 入口檔案
├─ styles/            # 全域樣式
│    └─ tailwind.css  # 主畫面
└─ vite-env.d.ts      # 環境變數
```
