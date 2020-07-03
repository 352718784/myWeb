const hLoading = {
  install (Vue) {
    // 构建加载层和空数据层组件，利用transition组件生成添加过度效果
    // 使用render函数来生成模板，后续考虑自定义vnode
    const Mask = Vue.extend({
      render (createElement, hack) {
        let vLoading = createElement('div',
          {key: 'loading', attrs: {class: 'h-loading-shade loading'}},
          [createElement('img', {attrs: {src: require('static/image/loading.gif')}})])
        let vEmpty = createElement('div',
          {key: 'empty', attrs: {class: 'h-loading-shade'}},
          [createElement('img', {attrs: {src: require('static/image/empty.png')}})])
        return createElement('transition', {
          props: {
            name: 'h-loading-fade', mode: 'out-in'
          }
        }, [this.loading ? vLoading
          : (this.empty ? vEmpty : null)])
      },
      data () {
        return {
          loading: false, // 加载层显示控制
          empty: false // 空数据层显示控制
        }
      }
    })
    // 开始注册全局指令 v-h-loading
    Vue.directive('h-loading', {
      bind (el, binding) {
        // 实例组件，通过传入的参数初始化data数据
        const mask = new Mask({
          el: document.createElement('div'),
          data: {
            loading: binding.value.loading,
            empty: binding.value.empty
          }
        })
        el.instance = mask // 将组件实例挂在el下
        el.mask = mask.$el // 组件挂载成功后的dom挂在el下
        el.className = el.className + ' h-loading-relative' // 修改绑定的el的class，新增的class 可在全局样式中查看
        el.appendChild(mask.$el) // 绑定的el中添加dom节点
      },
      // 组件参数发生改变，触发改钩子函数，对组件中的data数据进行设置
      update (el, binding) {
        el.instance.loading = binding.value.loading
        el.instance.empty = binding.value.empty
      },
      // 自定义组件解绑，移除组件生成的dom节点，销毁组件并将指针指向null，让浏览器自动回收
      unbind (el, binding) {
        if (el.instance) {
          el.mask && el.mask.remove()
          el.mask = null
          el.instance && el.instance.$destroy()
          el.instance = null
        }
      }
    })
  }
}
export default hLoading
