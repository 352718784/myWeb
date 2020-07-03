<template>
    <div class="pieMenu center">
      <div class="circle circle1 center">
        <div v-for="item in menu" :key="item.id">{{item.name}}</div>
      </div>
      <div class="circle circle2 center">
        <div class="menu2 zero center" :style="item1.style"
             v-for="(item1) in menu[selectedMenu[0]].children" :key="item1.id">
          <div>
            {{item1.name}}
          </div>
          <div :key="item2.id" :style="item2.style" class="menu3 zero center" v-for="item2 in item1.children">{{item2.name}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import comm from '@/common/comm'
export default {
  name: 'pieMenu',
  data () {
    return {
      size: 10,
      size2: 18,
      r: 80,
      menu: [
        {name: '1',
          id: 1,
          children: [
            {name: '2',
              id: 2,
              children: [
                {name: '3', id: 8}, {name: '3', id: 9}, {name: '3', id: 10}
              ]}, {name: '2', id: 3}, {name: '2', id: 4}, {name: '2', id: 5}
          ]},
        {name: '3', id: 7}
      ],
      selectedMenu: [0]
    }
  },
  mounted () {
    // this.r = this.$el.querySelector('.circle1').offsetWidth / 2
    comm.indexOfTree(this.menu, a => {
      if (!a.level) {
        a.level = 1
        a.r = 0
      }
      if (a.children && a.children.length) {
        let deg = 180 / (a.children.length + 1)
        a.children.forEach((b, i) => {
          b.level = a.level + 1
          b.r = a.r + this.r
          b.deg = 90 - deg * (i + 1)
          b.style = {transform: `rotateZ(${b.deg}deg) translateY(${b.r}px)`}
        })
      }
    })
    console.log(this.menu)
  }
}
</script>

<style scoped lang="scss">
  .pieMenu{
    position: relative;height: 20rem;overflow: hidden;
    >.circle{
      position: absolute;border-radius: 100%;
      text-align: center;top: 0;
      &.circle1{
        z-index: 2;width: 5rem;
      }
      &.circle2{
        background-color: $green1;
        >.menu2{
          position: absolute;top: 0;transform: rotateZ(30deg) translateY(8rem);
        }
      }
    }
  }
  .zero{
    width: 0;height: 0;
  }
</style>
