// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import Interceptor from './services/interceptor.js';

let loading = new Interceptor();
// Vue.use(ElementUI)
Vue.use(iView)
Vue.config.productionTip = false
loading.request(iView);
loading.response(iView);
loading.config(iView);
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
