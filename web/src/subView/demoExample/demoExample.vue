<template>
    <article class="demoExample">
      <dl class="catalog part">
        <dt v-if="!item.hidden" :class="['catalog-item', item.component === example?'checked':'']"
            :key="index" @click="$router.push({query: {example: item.component}})"
            v-for="(item, index) in catalog">
          {{item.name}}
        </dt>
      </dl>
      <section class="window part">
        <component v-if="example" key="sub-window" class="sub-window"
                   :is="example"></component>
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
import HLoadingWindow from '../../components/HLoading/HLoadingWindow'
import CanvasDemo1 from '../../components/canvasDemo/canvasDemo1'
import Demo from '../../components/demo'
import eventBus from '../../components/eventBus'
import HPoppverWindow from '../../components/hPopover/hPoppverWindow'
import MyPromiseWindow from '../../components/myPromise/myPromiseWindow'
import KARExample from '../../components/KARExample/KARExample'
import KSHExample from '../../components/KSHExample/KSHExample'
export default {
  name: 'demoExample',
  components: {
    KSHExample,
    KARExample,
    MyPromiseWindow,
    HPoppverWindow,
    Demo,
    CanvasDemo1,
    HLoadingWindow,
    PieMenuWindow,
    MulticardDisplayWindow,
    HoverEffectWindow,
    LoadingIconWindow,
    DraggingCompWindow,
    Parallax,
    TitlePopWindow,
    ShaingWaterWindow},
  props: {
    example: {default: 'shaing-water-window'}
  },
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
        {name: '转盘菜单', component: 'pie-menu-window'},
        {name: 'elementUI中的v-loading', component: 'h-loading-window'},
        {name: '基于el-poppver进行的二次封装，主要对样式进行了调整', component: 'h-poppver-window'},
        {name: 'Promise 简易实现', component: 'my-promise-window'},
        {name: 'canvasDemo', component: 'canvas-demo1', hidden: true},
        {name: '测试代码', component: 'demo'},
        {name: 'kar测试代码', component: 'k-a-r-example'},
        {name: '可视化测试代码', component: 'k-s-h-example'}
      ],
      selectedDemo: 'hover-effect-window'
    }
  },
  created () {
    eventBus.$on('hello', r => {
      console.log('接受到消息', r)
    })
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
      margin: .3rem;cursor: pointer;user-select: none;
      color: $fontCol2;position: relative;padding: .2rem;
      transition: all .3s;border-radius: .2rem;
      background-image: linear-gradient(to right,$blue1 50%, rgba(255, 255, 255, 0) 0%);
      background-position: left;background-size: 0;
      background-repeat: no-repeat;
      &:hover{
        color: white;background-size: 200%;
      }
      &.checked{
        color: white;background-size: 200%;
      }
    }
  }
  .window{
    flex: 1; overflow: scroll;
    margin: .5rem .5rem .5rem 0;
  }
  .sub-window{
    width: 100%; height: 100%;
  }
</style>
