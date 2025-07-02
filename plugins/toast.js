import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import Vue from 'vue'


Vue.use(Toast, {
    position: 'top-right',
    timeout: 30000,
  });