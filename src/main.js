import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/elementUi/index'
// 富文本编辑器全局引入
import VueQuillEditor from 'vue-quill-editor'
import '@/assets/global.less'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入dayjs方法
import dayjs from 'dayjs'

// 定义时间格式化函数
Vue.prototype.$formatDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD HH:mm:ss')
}
Vue.config.productionTip = false
Vue.use(VueQuillEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
