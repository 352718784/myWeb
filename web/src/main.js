// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import popFunc from './components/popFunc/index'
import hLoading from './components/HLoading/HLoading'
import ableDrapedEl from './components/draggingComp/ableDrapedEl'
import HoverEffect from './components/hoverEffect/hoverEffect'
Vue.use(ElementUI)
Vue.use(ableDrapedEl)
Vue.use(popFunc)
Vue.use(hLoading)
Vue.component('HoverEffect', HoverEffect)
router.beforeEach((to, from, next) => {
  if (!to.name || to.name === 'mainView') {
    next({path: '/mainView/mainPage'})
  } else next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
