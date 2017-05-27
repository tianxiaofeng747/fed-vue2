const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard')
const table = r => require.ensure([], () => r(require('../pages/table/Table')), 'table')
const File = r => require.ensure([], () => r(require('../pages/imgUpload/File')), 'File')
import Auth from '../pages/auth/Auth';
export default [
    {
        path: '/', redirect: '/dashboard'
    },
	{
		path:'/auth',
		name:'auth',
		component: Auth
	}, {
		path: '/dashboard',
		name: 'dashboard',
		component: dashboard,
		children: [
			{path: '/table', component: table, name: 'table'},
			{path: '/file', component: File, name: 'File'}
		]
	}
]
