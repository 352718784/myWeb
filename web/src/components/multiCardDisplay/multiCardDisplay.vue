<template>
    <div class="multiCardDisplay">
      <div :class="['card', mode==='expand'?'':'']" :data-index="index" v-for="(item, index) in cardsData"
           :style="{...item.style,
           ...{'z-index': selectedIndex===index?cardsData.length+1:cardsData.length-index}}"
           @click="paging(index)"
           @dblclick="expand(index)"
           :key="item.id">
        <slot :data="{item, selectedIndex}"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'multiCardDisplay',
  props: {
    cards: {default () { return [] }},
    aspectRatio: {default: 1.5}, // 高宽比
    zoomRatio: {default: 1} // 缩放比
  },
  data () {
    return {
      cardsData: [],
      columnNum: 0,
      minMargin: 10,
      w: 0,
      h: 0,
      selectedIndex: 0,
      mode: 'expand'
    }
  },
  watch: {
  },
  methods: {
    prev () {
      if (this.selectedIndex === 0) this.selectedIndex = this.cardsData.length - 1
      else this.selectedIndex--
      this.paging(this.selectedIndex)
    },
    next () {
      if (this.selectedIndex === this.cardsData.length - 1) this.selectedIndex = 0
      else this.selectedIndex++
      this.paging(this.selectedIndex)
    },
    paging (i) {
      if (this.mode === 'expand') {
        this.selectedIndex = i
        let zoomRatio = 0.8
        let x = (this.$el.offsetWidth - this.w) / 2
        let y = this.$el.offsetHeight * 0.05
        this.cardsData.forEach((a, i) => {
          let x1 = x + (i - this.selectedIndex) * this.w
          if (i > this.selectedIndex) x1 = x1 + this.w * (1 - zoomRatio)
          a.style.transform = `translate(${x1}px, ${i === this.selectedIndex ? y : y + (1 - zoomRatio) * this.h / 2}px) scale(${i === this.selectedIndex ? 1 : zoomRatio})`
        })
      }
    },
    gather () {
      this.mode = 'gather'
      this.cardsData.forEach((a, i) => {
        a.style.transform = `translate(${a.l}px, ${a.t}px) scale(${this.zoomRatio})`
      })
    },
    expand (index = 0) {
      this.mode = 'expand'
      this.$nextTick(() => {
        this.$el.scrollTop = 0
        this.paging(index)
      })
    },
    _computeCardPosi () {
      let h = this.h = this.$el.offsetHeight * 0.9
      let w = this.w = h / this.aspectRatio
      // this.cards
      let cards = []
      let width = this.$el.offsetWidth
      let columnNum = parseInt(width / (w * this.zoomRatio + this.minMargin * 2))
      let margin = (width - w * this.zoomRatio * columnNum) / (columnNum + 1)
      cards = this.cards.map((a, i) => {
        let l = i % columnNum * (w * this.zoomRatio + margin) + margin
        let t = parseInt(i / columnNum) * (h * this.zoomRatio + margin) + margin
        return {
          id: a.id,
          index: i,
          w,
          h,
          l,
          t,
          style: {width: `${w}px`, height: `${h}px`, transform: `translate(${l}px, ${t}px) scale(${this.zoomRatio})`}}
      })
      this.cardsData = cards
    }
  },
  mounted () {
    this._computeCardPosi()
  }
}
</script>

<style scoped lang="scss">
  $duration: 1s;
  .multiCardDisplay{
    position: relative;height: 100%;
    >.card{
      height: 16rem;width: 10rem;
      transition: opacity .5s, transform 0.5s;position: absolute;color: white;
      box-sizing: border-box;overflow: visible;
      transform-origin: 0 0;transition-delay: .1s;
      &.hidden{
        opacity: 0;
      }
    }
  }
  .paging{
    position: absolute;
    top: 50%;transform: translateY(-50%);
    font-size: 5rem;z-index: 9999;
    &.next{
      right: 0;
    }
    &.prev{
      left: 0;
    }
  }
  .exit{
    position: absolute;right: .5rem;top: .5rem;
  }
</style>
