import popDia from './popDia'
const popFunc = {
  install (Vue) {
    Vue.directive('showTitle', {
      bind (dom, binding) {
        console.log(binding.value)
        let vm = false
        dom.addEventListener('mouseenter', e => {
          vm = pop(binding.value, e)
        })
        dom.addEventListener('mouseleave', e => {
          close(vm)
        })
      },
      inserted (e) {
      }
    })
    Vue.component('pop-dia', popDia)
    function close (vm) {
      vm.show = false
      // 把组件实例销毁的过程放在异步方法中，否则组件销毁后，nextTick不会因为show值改变后的视图修改
      vm.$nextTick(() => {
        vm.$el.addEventListener('transitionend', (e) => {
          let dom = e.target
          document.body.removeChild(dom)
          if (dom) dom = null
        }, false)
        vm.$destroy()
        vm = null
      })
    }
    function pop (vnode, e) {
      // 新增vue子类
      let VuePopDia = Vue.extend({
        render (c) {
          let props = {show: this.show}
          let style = {position: 'absolute', left: `${this.x}px`, top: `${this.y}px`}
          return c('pop-dia', {props, style, on: { close: this.closeDia }}, [vnode])
        },
        data () {
          return {
            show: false,
            x: 0,
            y: 0
          }
        },
        methods: {
          closeDia () {
            this.$emit('close')
          }
        }
      })
      // 实例组件
      let vm = new VuePopDia().$mount()
      vm.$on('close', () => {
        close(vm)
      })
      let el = vm.$el
      vm.show = true
      document.body.appendChild(el)
      vm.$closeDia = close
      if (e) {
        vm.$nextTick(() => {
          vm.x = e.pageX - e.offsetX - vm.$el.offsetWidth / 2 + e.currentTarget.offsetWidth / 2; vm.y = e.pageY - e.offsetY - vm.$el.offsetHeight - 10
          if (vm.x < 5) vm.x = 5
          console.log(vm.$el.offsetHeight, vm.$el.offsetWidth, e.currentTarget.offsetWidth)
        })
      }
      return vm
    }
    Vue.prototype.$titlePop = pop
  }
}
export default popFunc
