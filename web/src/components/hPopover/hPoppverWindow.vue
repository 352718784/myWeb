<template>
  <section>
    <h-popover trigger="click" placement="right-start" width="218" popper-class="test-class">
      <div>你看不见你的真相，你所看见的，只是你的影子。</div>
      <el-button slot="reference">点击弹窗</el-button>
    </h-popover>
    <h4>使用方法：</h4>
    <p></p>
    <img src="static/image/202007241.png"/>
    <p>trigger 触发方式，同el-popover，下同， placement 出现位置，width 宽度，popper-class 弹窗样式</p>
    <p>使用了两个插槽，默认插槽，弹窗内的内容；reference具名插槽，窗口触发按钮</p>
    <h4>设置思路：</h4>
    <p>将el-popover默认样式使用其他样式进行覆盖，之后再窗口中新增canvas标签，利用canvas绘制出新的窗口背景即可</p>
    <h4>主要代码：</h4>
    <p>组件模板，为了展示更好的显示效果，监听show事件并绘制背景,由于无法再 this.$el中找到弹窗的元素，需要再弹窗中添加一个唯一class值，在文档全局中寻找，测试窗口的宽高</p>
    <img src="static/image/202007242.png">
    <p>在窗口开始弹出时，绘制背景，主要注意的是，在当前阶段，窗口的display依然为none，手动添加样式将窗口在页面中渲染出来，用于测量宽高</p>
    <p>考虑到该背景不仅仅在当前场景中用到，对背景绘制过程进行了封装</p>
    <img src="static/image/202007243.png">
    <p>背景绘制过程封装类，需要传入canvas节点，宽，高，边框距离画布距离和四角内折距离</p>
    <img src="static/image/202007244.png">
    <img src="static/image/202007245.png">
  </section>
</template>

<script>
import HPopover from './hPopover'
export default {
  name: 'hPoppverWindow',
  components: {HPopover}
}
</script>
