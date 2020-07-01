const ableDrapedEl = {
  install (Vue) {
    Vue.directive('ableDrapedEl', {
      bind (el, binding) {
        let type = typeof binding.value.value
        // el.setAttribute('draggable', true)
        el.addEventListener('dragstart', (e) => {
          let val = JSON.stringify(type === 'function' ? binding.value.value() : binding.value.value)
          e.dataTransfer.setData(binding.value.key, val)
        })
      }
    })
  }
}
export default ableDrapedEl
