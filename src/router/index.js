import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/dashboard/Dashboard';
import Table from '@/pages/Table';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children:[
        { path: '/table', component: Table, name: 'Table' }
      ]
    }
  ]
})
