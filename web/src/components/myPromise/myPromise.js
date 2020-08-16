export class MyPromise {
  constructor (fn) {
    // pending fulfilled reject
    this.state = 'pending'
    this.taskList = [] // 任务列表，再执行then，catch等方法时收集传入的函数对象，当状态改变时便利按序执行
    // fn是类在实例时传入的方法，传入 resolve 和 reject 两个方法，通过bind来绑定this，另外需要在异步中
    this.val = undefined
    this.reason = undefined
    this.onFullfilledTask = []
    this.onRejectTask = []
    this.taskList = []
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve (val) {
    setTimeout(() => {
      this.state = 'fulfilled'
      this.val = val
      this.onFullfilledTask.forEach(task => task(this.val))
    })
  }
  reject (reason) {
    setTimeout(() => {
      this.state = 'reject'
      this.reason = reason
      this.onRejectTask.forEach(task => task(this.val))
    })
  }
  then (onFulfilled = val => val, onRejected = reason => reason) {
    let promise2
    promise2 = new MyPromise((resolve, reject) => {
      this.onFullfilledTask.push(() => {
        try {
          const x = onFulfilled(this.val)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
      this.onRejectTask.push(() => {
        try {
          const x = onRejected(this.reason)
          reject(x)
        } catch (e) {
          reject(e)
        }
      })
    })
    return promise2
  }
  catch (onReject) {
    return this.then(val => val, onReject)
  }
}
