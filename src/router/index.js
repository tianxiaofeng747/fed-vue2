const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard')
const table = r => require.ensure([], () => r(require('../pages/table/Table')), 'table')
const File = r => require.ensure([], () => r(require('../pages/imgUpload/File')), 'File')
const chart = r => require.ensure([], () => r(require('../pages/chart/chart')), 'chart')
import Auth from '../pages/auth/Auth';
import CertRegister from  '../pages/certRegister/certRegister';
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
			{path: '/file', component: File, name: 'File'},
			{path: '/chart', component: chart, name: 'chart'},
            {
                path:'/certRegister',
                name:'certRegister',
                component: CertRegister,
            }
		]
	}
]
