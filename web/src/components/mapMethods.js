import vue from 'vue'

const methods = {
  test1 () {
    let Vm = vue.extend({
      render (c) {
        return c('HoverEffect')
      },
      mounted () {
        console.log('hsq hello')
      }
    })
    let vm1 = new Vm({
      el: document.createElement('div')
    })
    console.log(vm1, vm1.$el)
  }
}
export default methods
