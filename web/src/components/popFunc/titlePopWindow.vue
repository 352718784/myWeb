<template>
    <div class="titlePopWindow">
      <p>elementUI中有el-popover组件，弹出气泡窗口，虽然方便并且扩展性强，但是对文档的可读性有一定的影响，并且在开发过程中经常需要手动刷新页面来保证气泡弹窗内容的更新，
        我在之前的工作中，用气泡窗口最多的还是title，毕竟 浏览器自带的title太丑了，样式也无法自定义调整，
        之后写了这个例子，用于之后的工作中，主要还是用来取代浏览器中自带的title</p>
      <div class="example-line">
        <p title="浏览器的title">浏览器的title</p>
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          content="使用el-popover做的title">
          <p slot="reference">使用el-popover做的title</p>
        </el-popover>
        <p v-show-title="'当前的例子的title'">当前的例子的title</p>
      </div>
      <p>
        <strong>使用方法：</strong>{{code}}， 在v-show-stitle 传入string 或者 vnode，只供内部使用，并未对传入的数据格式做校验
      </p>
      <p>
        <strong>设计思路：</strong>注册一个全局自定义指令，在bind钩子中，对传入的el元素监听mouseenter 和 mouseleave事件，
        mouseenter绑定生成弹窗方法，mouseleave绑定弹窗删除方法
      </p>
      <p>弹窗生成方法：使用vue的extend方法，生成了一个新的vue组件实例，根据 <strong>v-show-stitle</strong> 传入的内容，构建新的vue组件的render方法，
      之后通过 $mount 方法，将生成的 $el dom节点插入 body标签中</p>
      <p>弹窗删除方法：在生成弹窗的过程中，会将vue实例使用一个 let变量保存起来，触发删除后，vue实例执行$destroy进行销毁,并将页面中的dom节点删除，vue实例设置未null</p>
      <ol>
        <strong>注意事项：</strong>
        <li :key="index" v-for="(item, index) in note">{{item}}</li>
      </ol>
      <div>
        <strong>关键代码：</strong>
        <div :key="index" v-for="(item, index) in img">
          <p>{{item.remark}}</p>
          <img :src="item.src"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'titlePopWindow',
  data () {
    return {
      code: '<p v-show-title="string/vnode">当前的例子的title</p>',
      img: [
        {remark: '注册一个全局指令，在bind钩子中绑定事件'},
        {remark: '创建组件，使用transiton组件包裹，使用show变量控制页面显示，show通过props传入，受父组件控制'},
        {remark: '新增vue子类，使用render构建组件模板，手动挂载后将组件dom插入body中，利用鼠标事件计算当前dom在页面中的视觉坐标'},
        {remark: 'vue子类show变量设置未false，在下一个nextTick方法中进行组件实例销毁，'}
      ],
      note: [
        'clientY 指的是距离可视页面左上角的距离',
        'pageY 指的是距离可视页面左上角的距离(不受页面滚动影响)',
        'screenY 指的是距离屏幕左上角的距离',
        'layerY 指的是找到它或它父级元素中最近具有定位的左上角距离',
        'offsetY 指的是距离它自己左上角的距离'
      ]
    }
  },
  created () {
    this.img.forEach((a, i) => {
      a.src = require(`../../../static/image/tp${i + 1}.png`)
    })
  }
}
</script>

<style scoped lang="scss">
.example-line{
  display: flex;
  p{
    padding: .2rem .5rem; background: $blue1; color: white;
    margin: 0 .5rem;border-radius: .3rem;
  }
}
</style>
