import Vue from 'vue'
import Router from 'vue-router'
import resume from '@/components/resume'

Vue.use( Router )

export default new Router({
	// 这就是手写的后果，多个r，是routes
	routes:[{
		path:'/',
		name:'resume',
		component : resume
	}]
})