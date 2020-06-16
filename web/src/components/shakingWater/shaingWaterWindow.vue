<template>
    <div>
      <shaking-water :value="60"></shaking-water>
      <p><strong>使用方法：</strong>
        <span>{{code}}</span>
      </p>
      <p>value 设置水位高度，仅在初始化的时候生效，value的有效值默认0-100</p>
      <p><strong>设置思路：</strong>使用animeJs的svg形变，水波又两种状态，波动状态和水平状态，波动状态下的曲线使用 二次贝塞尔曲线绘制，之后调整控制二次贝塞尔曲线的控制点，使线条变水平，
      在线条变为水平的过程中，线条进行从右到做的反复移动，外层盒子超出部分隐藏，让波浪生动起来</p>
      <div>
        <strong>关键代码：</strong>
        <div :key="item.src" v-for="(item, index) in img">
          <p>{{index+1}}.{{item.remark}}</p>
          <img :src="item.src" />
        </div>
      </div>
    </div>
</template>

<script>
import ShakingWater from './shakingWater'
export default {
  name: 'shaingWaterWindow',
  components: {ShakingWater},
  data () {
    return {
      code: '<shaking-water :value="70"></shaking-water>',
      img: [
        {remark: '在页面初始化时，获取组件宽高，通过computed分别计算svg水平时曲线和波动时曲线'},
        {remark: '绘制波浪，初始状态为水平'},
        {remark: '调用animeJs，右波浪状态过渡为水平状态，同时svg从右到左反复移动'}
      ]
    }
  },
  created () {
    this.img.forEach((a, i) => {
      a.src = require(`../../../static/image/sw${i + 1}.png`)
    })
  }
}
</script>

<style scoped>

</style>
