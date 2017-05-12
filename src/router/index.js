import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/pages/auth/Auth';
import Dashboard from '@/pages/dashboard/Dashboard';
import Table from '@/pages/Table';
import Upload from '@/pages/imgUpload/ImgUpload';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/auth',
            name:'auth',
            component: Auth
        },
        {
            path: '/dashboard',
            name: 'auth',
            component: Dashboard,
            children: [
                {path: '/table', component: Table, name: 'table'},
                {path: '/imgUpload', component: Upload, name: 'imgUpload'},
            ]
        }
    ]
})
