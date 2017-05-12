import Vue from 'vue' 
import VueRouter from 'vue-router'
import routes from './router/index.js' //router配置
import iView from 'iview'; //vue ui插件
import 'iview/dist/styles/iview.css'; //样式
import 'font-awesome/css/font-awesome.min.css' //字体图库
import App from './App'
import Interceptor from './services/interceptor.js';

/**
 * router
 */
Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: 'hash',
	strict: process.env.NODE_ENV !== 'production'
})
/**
 * 使用
 */
Vue.use(iView)
Vue.config.productionTip = false
/**
 * axios拦截器
 */
let loading = new Interceptor();
loading.request(iView);
loading.response(iView);
loading.config(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
