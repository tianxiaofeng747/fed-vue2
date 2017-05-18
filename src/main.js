import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './router/index.js' //router配置
import iView from 'iview'; //vue ui插件
import 'iview/dist/styles/iview.css'; //样式
import 'font-awesome/css/font-awesome.min.css' //字体图库
import App from './App';

import User from  './services/User';
import Http from  './services/Http';
/**
 * router
 */
Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: 'hash',
	strict: process.env.NODE_ENV !== 'production'
});
//router interceptor
router.beforeEach((to, from, next) => {
    if(to.path != '/auth'){
        User.currentUser().then(result =>{
            if(!User.msg || !User.msg.enterpriseNo){
                next({
                    path:'/auth'
                })
            }else{
                next();
            }
        },function () {
            next({
                path:'/auth'
            })
        });
    }else{
        next();
    }

});
/**
 * 使用
 */
Vue.use(iView)
Vue.config.productionTip = false
/**
 * axios拦截器
 */
Vue.prototype.Http = Http;
iView.LoadingBar.config({
	color: '#ff0',
	failedColor: '#f0ad4e',
	height: 5
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
