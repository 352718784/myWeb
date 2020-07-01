<template>
    <article class="demoExample">
      <dl class="catalog part">
        <dt class="catalog-item"
            :key="index" @click="selectedDemo=item"
            v-for="(item, index) in catalog">{{item.name}}</dt>
      </dl>
      <section class="window part">
        <component v-if="selectedDemo" key="sub-window" class="sub-window"
                   :is="selectedDemo.component"></component>
      </section>
      <nav></nav>
    </article>
</template>

<script>
import ShaingWaterWindow from '../../components/shakingWater/shaingWaterWindow'
import TitlePopWindow from '../../components/popFunc/titlePopWindow'
import Parallax from '../../components/parallax/parallax'
import DraggingCompWindow from '../../components/draggingComp/draggingCompWindow'
import LoadingIconWindow from '../../components/loadingIcon/loadingIconWindow'
import HoverEffectWindow from '../../components/hoverEffect/hoverEffectWindow'
import MulticardDisplayWindow from '../../components/multiCardDisplay/multicardDisplayWindow'
import PieMenuWindow from '../../components/pieMenu/pieMenuWindow'
export default {
  name: 'demoExample',
  components: {
    PieMenuWindow,
    MulticardDisplayWindow,
    HoverEffectWindow,
    LoadingIconWindow,
    DraggingCompWindow,
    Parallax,
    TitlePopWindow,
    ShaingWaterWindow},
  data () {
    return {
      catalog: [
        {name: '带波浪的进度', component: 'shaing-water-window'},
        {name: '自定义title', component: 'title-pop-window'},
        {name: '视觉差文章展示', component: 'parallax'},
        {name: '拖拽组件', component: 'dragging-comp-window'},
        {name: 'loading图标', component: 'loading-icon-window'},
        {name: '一些有趣的hover效果', component: 'hover-effect-window'},
        {name: '多卡片显示效果', component: 'multicard-display-window'},
        {name: '转盘菜单', component: 'pie-menu-window'}
      ],
      selectedDemo: {name: '转盘菜单', component: 'pie-menu-window'}
    }
  },
  created () {
  },
  methods: {
    computedPosition (e) {
      console.log(e)
    },
    test2 (e) {
      // this.computedPosition()
      console.log(e)
    },
    test (e) {
      let vnode = this.$createElement('p', 'hello,by $titlePop')
      this.vm = this.$titlePop(vnode, e, [e.x - e.offsetX, e.y - e.offsetY])
    },
    test3 () {
      console.log(this.vm)
    }
  }
}
</script>

<style scoped lang="scss">
  .demoExample{
    display: flex;height: 100%;
    >.part{
      background-color: $grey4;border-radius: .2rem;
      padding: .5rem;
    }
  }
  .catalog{
    margin: .5rem;
    width: 15rem;
    >.catalog-item{
      margin: .5rem;cursor: pointer;user-select: none;
      color: $fontCol2;
    }
  }
  .window{
    flex: 1; overflow: scroll;
    margin: .5rem .5rem .5rem 0;
  }
</style>
