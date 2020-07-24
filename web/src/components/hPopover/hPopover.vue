<template>
  <el-popover :visible-arrow="false" @show="drawCanvas"
              :popperClass="`h-popover-class ${id} ${popperClass}`" :placement="placement"
              :width="width" :trigger="trigger">
    <canvas class="h-popover-canvas"></canvas>
    <slot></slot>
    <slot slot="reference" name="reference">
      <el-button slot="reference">click 激活</el-button>
    </slot>
  </el-popover>
</template>

<script>
import Draw from './hPopoverDraw'
export default {
  name: 'h-popover',
  props: {
    width: {default: '300'},
    placement: {default: 'right-start'},
    trigger: {default: 'click'},
    popperClass: {type: String}
  },
  data () {
    return {
      draw: {},
      id: `h-popover-id-${new Date().getTime()}` // 为了能再全局中能找到该弹窗窗口，使用事件来设置唯一的class名字
    }
  },
  computed: {
  },
  methods: {
    // 开始绘制边框
    drawCanvas () {
      let window = document.querySelector(`.${this.id}`)
      // el-popover组件，触发show时窗口元素是隐藏的，需要手动将它显示出来，以此获得窗口的长宽高，获取成功后，再将窗口样式重置回去
      window.classList.add('show')
      this.draw = new Draw(window.querySelector('.h-popover-canvas'), window.offsetWidth, window.offsetHeight, 7, 5)
      window.classList.remove('show')
      this.draw.setBorder()
      this.draw.setBoxShadow()
      this.draw.drawBorder()
      this.draw.setBorder({width: 3, color: 'green'})
      this.draw.setBoxShadow({blur: 0})
      this.draw.drawQuadrangle()
    }
  }
}
</script>

<style lang="scss">
.h-popover-class{
  background-color: unset;
  box-shadow: unset;
  border: unset;
  &.show{
    display: block !important;opacity: 0
  }
  >.h-popover-canvas{
    position: absolute;top: 0;left: 0;z-index: -1;
  }
}
</style>
