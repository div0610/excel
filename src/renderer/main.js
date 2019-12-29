import Vue from 'vue'
import axios from 'axios'
import VueTour from 'vue-tour'


import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';  // 新添加
import 'element-ui/lib/theme-chalk/index.css';  //新添加
import './assets/css/index.css'
require('vue-tour/dist/vue-tour.css')
// import Driver from 'driver.js'
// import 'driver.js/dist/driver.min.css'
// import steps from "@/utils/defineSteps"; //用来存放引导的步骤

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(Driver);
// Vue.use(steps);
// Vue.prototype.$driver = new Driver({
//   doneBtnText: '完成',              // Text on the final button
//   closeBtnText: '关闭',            // Text on the close button for this step
//   stageBackground: 'salmon',       // Background color for the staged behind highlighted element
//   nextBtnText: '下一步',              // Next button text for this step
//   prevBtnText: '上一步',          // Previous button text for this step
// })

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
