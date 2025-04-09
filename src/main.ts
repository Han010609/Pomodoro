console.log("VITE_TEST_MODE:", import.meta.env.VITE_TEST_MODE);

import { createApp } from 'vue';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router';
import './styles/tailwind.css';

const app = createApp(App);
app.use(router);
app.use(VueSweetalert2);
app.mount('#app');