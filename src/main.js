import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const Vue = createApp(App)
Vue.use(ElementPlus)
Vue.component('QuillEditor',QuillEditor)
Vue.use(store).use(router).mount('#app')
