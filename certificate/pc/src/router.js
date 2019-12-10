import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import login from './views/login'


import dashboard from './views/dashboard'
import createCode from './views/code/createCode'
import orgList from './views/code/orgList'
import familyList from './views/code/familyList'
import codeList from './views/code/codeList'
import codeInfo from './views/code/codeInfo'
import createRQ from './views/code/createRQ'
import batchDataList from './views/batchData/batchDataList'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'login',
			component: login,
		},
		{
			path: '/home',
			name: 'home',
			component: home,
			children: [
				//教师
				{
					path: '/dashboard',
					name: 'dashboard',
					component: dashboard
				},
				{
					path: '/createCode',
					name: 'createCode',
					component: createCode
				},
				{
					path: '/orgList',
					name: 'orgList',
					component: orgList
				},
				{
					path: '/familyList',
					name: 'familyList',
					component: familyList
				},
				{
					path: '/codeList',
					name: 'codeList',
					component: codeList
				},
				{
					path: '/codeInfo',
					name: 'codeInfo',
					component: codeInfo
				},
				{
					path:'/createRQ',
					name:'createRQ',
					component:createRQ
				},
				{
					path:'/batchDataList',
					name:'batchDataList',
					component:batchDataList
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},


	]
})
