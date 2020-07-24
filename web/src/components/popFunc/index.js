import popDia from './popDia'
const popFunc = {
  install (Vue) {
    Vue.directive('showTitle', {
      bind (dom, binding) {
        dom.addEventListener('mouseenter', e => {
          if (dom._vm) {
            dom._vm.mouseIn = true
            dom._vm.show = true
          } else {
            dom._vm = pop(binding.value, e)
            dom._vm.$on('startDestroy', _ => {
              dom._vm.$el.remove()
              dom._vm.$destroy()
              dom._vm = null
            })
          }
        })
        dom.addEventListener('mouseleave', e => {
          dom._vm.mouseIn = false
          setTimeout(_ => {
            if (!dom._vm.mouseIn) dom._vm.show = false
          }, 100)
        })
      }
    })
    Vue.component('pop-dia', popDia)
    function pop (vnode, e) {
      // 新增vue子类
      let VuePopDia = Vue.extend({
        render (c) {
          let props = {show: this.show}
          let style = {position: 'absolute', left: `${this.x}px`, top: `${this.y}px`}
          let on = {startDestroy: this.startDestroy, mouseIn: this.setMouseIn}
          return c('pop-dia', {props, style, on}, [vnode])
        },
        data () {
          return {
            show: false,
            x: 0,
            y: 0,
            mouseIn: false
          }
        },
        methods: {
          startDestroy () {
            this.$emit('startDestroy')
          },
          setMouseIn (val) {
            this.mouseIn = val
            if (!val) {
              setTimeout(_ => {
                if (!this.mouseIn) this.show = false
              }, 100)
            }
          }
        }
      })
      // 实例组件
      let vm = new VuePopDia().$mount()
      let el = vm.$el
      document.body.appendChild(el)
      vm.show = true
      if (e) {
        vm.$nextTick(() => {
          vm.x = e.pageX - e.offsetX - vm.$el.offsetWidth / 2 + e.currentTarget.offsetWidth / 2; vm.y = e.pageY - e.offsetY - vm.$el.offsetHeight - 10
          if (vm.x < 5) vm.x = 5
        })
      }
      return vm
    }
  }
}
export default popFunc
