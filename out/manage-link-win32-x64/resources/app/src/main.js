import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  Button from 'cube-ui/lib';
import 'cube-ui/lib/style.css';
Vue.use(Button)

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
