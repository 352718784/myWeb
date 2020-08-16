import Vue from 'vue'
import Router from 'vue-router'
import mainView from '../mainView'
import mainPage from '../subView/mainPage/mainPage'
import devTools from '../subView/devTools/devTools'
import demoExample from '../subView/demoExample/demoExample'
import collectedQuestions from '../subView/collectedQuestions/collectedQuestions'
import demo from '../components/demo'
// import devTools from '../subView/devTools/devTools'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mainView',
      component: mainView,
      name: 'mainView',
      children: [
        {
          path: 'mainPage',
          component: mainPage,
          name: 'mainPage'
        },
        {
          path: 'devTools',
          component: devTools,
          name: 'devTools'
        },
        {
          path: 'demoExample',
          component: demoExample,
          props: (route) => ({example: route.query.example}),
          name: 'demoExample'
        },
        {
          path: 'collectedQuestions',
          component: collectedQuestions,
          name: 'collectedQuestions'
        },
        {
          path: 'demo',
          component: demo,
          name: 'demo'
        }
      ]
    }
  ]
})
