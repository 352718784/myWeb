<template>
      <transition-group tag="div" class="pieMenu center" name="">
        <div :style="{transition: `transform ${duration}ms, opacity ${duration}ms`,width: item.r*2+'px',height: item.r+'px',zIndex: selectedMenu.length - index}"
             :key="item.id" v-for="(item, index) in selectedMenu"
             :class="['turntable',`turntable${item.level}`, item.expand?'show':'hidden']">
          <div class="center zero" :style="item1.style" @click="expandMenu(item1.children, item1.level + 1, item1)" :key="item1.id" v-for="item1 in item.children">
            <div class="menu-icon center" :style="{transform: `rotateZ(${360-item1.deg}deg)`}">
              <slot :data="item1"></slot>
            </div>
          </div>
        </div>
      </transition-group>
</template>

<script>
import comm from '@/common/comm'
export default {
  name: 'pieMenu',
  props: {
    menu: {default () { return [] }}
  },
  data () {
    return {
      r: 60,
      selectedMenu: [],
      duration: 300,
      zoomRate: 1
    }
  },
  methods: {
    expandMenu (args, level, item) {
      let needHidden = false
      this.selectedMenu.forEach((a, i) => {
        if (a.level < level) {
          console.log('维持原状')
        } else {
          if (a.expand) needHidden = true
          a.expand = false
        }
      })
      setTimeout(() => {
        this.selectedMenu.forEach((a, i) => {
          if (a.level < level) {
            console.log('维持原状')
          } else if (a.level === level) {
            a.children = args || []
            a.expand = Boolean(a.children.length)
          } else {
            a.children = []
          }
        })
      }, needHidden ? this.duration : 0)
    }
  },
  mounted () {
    let maxLevel = 1
    this.menu.forEach((a, i) => {
      a.level = 1
      a.r = this.r
      let deg = 180 / (this.menu.length + 1)
      a.deg = 90 - deg * (i + 1)
      a.style = {transform: `rotateZ(${a.deg}deg) translateY(${a.r}px)`}
    })
    comm.indexOfTree(this.menu, a => {
      if (a.children && a.children.length) {
        let deg = 180 / (a.children.length + 1)
        a.children.forEach((b, i) => {
          maxLevel = b.level > maxLevel ? b.level : maxLevel
          b.level = a.level + 1
          maxLevel = b.level > maxLevel ? b.level : maxLevel
          b.r = a.r + this.r * this.zoomRate
          b.deg = 90 - deg * (i + 1)
          b.style = {transform: `rotateZ(${b.deg}deg) translateY(${b.r}px)`}
        })
      }
    })
    this.selectedMenu = new Array(maxLevel).fill().map((a, i) => {
      return {
        id: i,
        level: i + 1,
        name: `第${i + 1}级菜单`,
        r: this.r + i * this.r * this.zoomRate,
        expand: false,
        style: {'z-index': this.selectedMenu.length - i},
        children: []
      }
    })
    console.log(this.selectedMenu, this.menu, maxLevel)
    this.$nextTick(() => {
      this.expandMenu(this.menu, 1)
    })
  }
}
</script>

<style scoped lang="scss">
  .pieMenu{
    position: absolute;height: 0;width: 0;
  }
  .zero{
    width: 0;height: 0;position: absolute;left: 50%;top: 0;
  }
  .menu-icon{
    width: 2rem;height: 2rem; border-radius: 100%;
    position: absolute;bottom: 0;cursor: pointer;
  }
  .turntable{
    display: flex;align-items: flex-end;justify-content: space-around;
    transform-origin: top;position: absolute;top: 0;
    border-radius: 0 0 100vh 100vh;
    &.hidden{
      opacity: 0;transform: scale(0);
    }
    &.show{
      opacity: 1;transform: scale(1);
    }
    &.turntable1{
      background-color: $blue1;color: white;
    }
    &.turntable2{
      background-color: white;color: $blue1;
    }
    &.turntable3{
      background-color: unset;
      .menu-icon {
        background-color: $blue1;color: white;
      }
    }
  }
</style>
