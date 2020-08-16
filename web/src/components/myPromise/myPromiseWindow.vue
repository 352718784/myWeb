<template>
    <div>
      <h4></h4>
      <p></p>
      <h4>设计思路</h4>
      <p>新增一个mypromise类，在实例化过程中，设置实例状态和任务列表，在then catch finally中收集任务，最后再根据类中的状态分别去执行对应的任务，其中then，catch等方法中需要
      返回类实例，方便进行链式调用</p>
      <h4>基本代码</h4>
      <p>再如何实现返回新的promise对象以及如何再catch后继续调用then中的方法的问题上卡思路了，等待后续解决</p>
    </div>
</template>

<script>
import {MyPromise} from './myPromise'
export default {
  name: 'myPromiseWindow',
  mounted () {
    new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject('bye')
      }, 2000)
    }).then(r => console.log('then1', r))
      .then(r => console.log('then2', r))
      .catch(e => console.log('catch1', e))
      .then(r => console.log('then3', r))
      .catch(e => console.log('catch2', e))
  }
}
</script>
