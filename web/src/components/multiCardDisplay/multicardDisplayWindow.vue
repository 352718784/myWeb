<template>
    <div class="multicardDisplayWindow">
      <el-button @click="$refs.comp1.expand()">expand</el-button>
      <el-button @click="$refs.comp1.gather(0)">gather</el-button>
      <div class="comp-window">
        <multi-card-display ref="comp1" :zoomRatio="0.4" :mode.sync="mode" :cards="cards" v-slot="slotVal">
          <div class="card">
            <div class="front">
              <p>作用域插槽</p>
              <p>展开方法：expand()</p>
              <p>收起方法：gather(index) 传入需要展示的卡片索引，默认为0。同时也可以使用这个方法跳转到指定页数</p>
            </div>
            <div class="behind">反面</div>
          </div>
        </multi-card-display>
      </div>

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
      mode: 'expand'
    }
  },
  created () {
    this.cards = new Array(30).fill().map((a, index) => {
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
    transform-origin: center;color: $red1;
    >.front, .behind{
      position: absolute;left: 0;top: 0;font-size: 2rem;width: 100%;
      transition: transform .5s;height: 100%; background-color: white;
      backface-visibility: hidden
    }
    >.behind{
      transform: rotateY(180deg);
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
