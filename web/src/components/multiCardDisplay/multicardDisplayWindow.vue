<template>
    <div class="multicardDisplayWindow">
      <el-button @click="$refs.comp1.expand(5)">展开并跳到第五位</el-button>
      <el-button @click="$refs.comp1.gather(0)">收起</el-button>
      <div class="scroll0 comp-window">
        <multi-card-display ref="comp1" :zoomRatio="0.4" :cards="cards" v-slot="slotVal">
          <div class="card">
            <div class="front center">
              <i class="ri-home-heart-fill"></i>
            </div>
            <div class="behind center">
              <i class="ri-home-heart-line"></i>
            </div>
          </div>
        </multi-card-display>
      </div>
      <h4></h4> <p></p>
      <h4>使用方法：</h4>
      <p>使用了作用域插槽，包含了传入的卡片数据信息，坐标轴，尺寸等信息</p>
      <p>zoomRatio：缩放比，组件扩张开和收起两种状态，展开时为原型尺寸，收起时进行缩放，因为使用缩放，所以列表排列需要手动计算坐标</p>
      <p>cards：传入的数据，类型数组，数组中的每一个元素需要有id，其他属性随意</p>
      <img src="static/image/7281.png"/>
      <p>通过ref来调用组件内的方法，expand为展开，gather是收起，expand可以传入数字参数，组件会跳转到相应的卡片中</p>
      <img src="static/image/7282.png"/>
      <p><small>组件本身非常的简单，主要工作量还是再坐标计算上，就不对代码实现做进一步的描述，另外页面中的动画使用transform，提高页面效率</small></p>
    </div>
</template>

<script>
import MultiCardDisplay from './multiCardDisplay'
export default {
  name: 'multicardDisplayWindow',
  components: {MultiCardDisplay},
  data () {
    return {
      cards: [],
      mode: 'expand',
      page: 1
    }
  },
  created () {
    this.cards = new Array(25).fill().map((a, index) => {
      return {id: index}
    })
  }
}
</script>

<style scoped lang="scss">
  .multicardDisplayWindow{
    width: 100%; height: 100%;
  }
  .card{
    position: relative;height: 100%;width: 100%;
    transform-style: preserve-3d;perspective: 1000;
    transform-origin: center;color: white;
    i{
      font-size: 15rem;
    }
    >.front, .behind{
      position: absolute;left: 0;top: 0;font-size: 2rem;width: 100%;border-radius: .5rem;
      transition: transform .5s;height: 100%; background-color: $blue1;
      backface-visibility: hidden
    }
    >.behind{
      transform: rotateY(180deg);background-color: $green1;
    }
    &:hover{
      >.front{
        transform: rotateY(180deg);
      }
      >.behind{
        transform: rotateY(360deg);
      }
    }
  }
  .comp-window{
    height: 30rem;width: 100%;
  }
</style>
