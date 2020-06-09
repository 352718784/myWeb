// const comm = function () {
//   return {
//     allowedRoute () {
//       return ['/mainView/mainPage', '/mainView/devTools']
//     }
//   }
// }
const comm = new class {
  constructor () {
    this.remark = '这个是一个通用类，内置多种方法'
    this.allowedRouteAPI = '全局守卫路由，允许哪些路由可以通过'
  }
  allowedRoute () {
    return ['/mainView/mainPage', '/mainView/devTools']
  }
  indexOfObj (arr, fn) {
    let index = -1
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i])) {
        index = i
        break
      }
    }
    return index
  }
}()
export default comm
