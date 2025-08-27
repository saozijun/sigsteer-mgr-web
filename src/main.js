import './assets/main.css'

import { createApp } from 'vue'
import pinia from '@/stores/index'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import elementIcons from '@/components/SvgIcon/svgicon'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Btn from '@/components/Btn.vue'
const app = createApp(App)
app.component('Btn', Btn)
app.use(pinia)
app.use(router)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)
app.use(ElementPlus,{
  locale: zhCn
})
app.mount('#app')
