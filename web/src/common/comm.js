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
  indexOfTree (tree, fn, always) {
    let stark = []
    let arr = []
    stark = stark.concat(tree)
    while (stark.length) {
      let temp = stark.shift()
      if (temp.children && temp.children.length) stark = stark.concat(temp.children)
      if (always) always(temp)
      if (fn && fn(temp)) {
        arr.push(temp)
        break
      }
    }
    return arr
  }
  indexOfTree2 (tree, fn) {
    let target = []
    debugger
    function query (tree, fn) {
      for (let i = 0; i++; i < tree.length - 1) {
        if (fn && fn(tree[i])) {
          target.push(target)
          break
        } else {
          if (tree[i].children && tree[i].children.length && !target.length) {
            query(tree.children, fn)
          }
        }
      }
    }
    query(tree, fn)
    return target
  }
  // 使用generator函数对树型数据遍历
  * traversalTree (tree) {
    for (let i of tree) {
      yield i
      if (i.children && i.children.length) {
        yield * this.traversalTree(i.children)
      }
    }
  }
  * idCreate () {
    let id = 0
    while (true) {
      yield id++
    }
  }
}()
export default comm
