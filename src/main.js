import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import  '@/assets/css/Standard.css'
import router  from './router'
import './permission.js'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './validate'
//import errorPlugin from '@/utils/errorPlugin'
import '@/utils/global.js'
import * as  uiCommon from '@/pubJs/UICommon.js'

  Vue.prototype.$uiCommon=uiCommon
  Vue.use(ElementUI);
  ///Vue.use(errorPlugin)
  Vue.config.productionTip = false
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
