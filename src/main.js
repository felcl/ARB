import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router} from './router'
import {store} from './store'
import i18n from './Lang'
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')