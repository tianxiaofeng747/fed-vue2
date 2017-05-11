import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Table from '@/pages/Table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        { path: '/table', component: Table, name: 'Table' }
      ]
    }
  ]
})
