/**
 * router配置文件
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './index.js'
import User from  '@/services/User';
/**
 * router
 */
Vue.use(VueRouter);
const router = new VueRouter({
	routes,
	mode: 'history',
	strict: process.env.NODE_ENV !== 'production'
});
/**
 * router interceptor
 */
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

export {router}