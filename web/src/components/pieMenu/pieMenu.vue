<template>
    <div class="pieMenu center">
      <div :style="{width:size+'rem', height:size/2+'rem', 'border-radius': `0 0 ${size}rem ${size}rem`}" class="circle circle1 center">
        <div v-for="item in menu" :key="item.id">{{item.name}}</div>
      </div>
      <div :style="{width:size2+'rem', height:size2/2+'rem', 'border-radius': `0 0 ${size2*2}rem ${size2*2}rem`}" class="circle circle2 center">
        <div class="menu2 zero center" :style="{transform: `rotateZ(${(index+1)*180/menu[selectedMenu[0]].children.length}deg) translateY(8rem)`}" v-for="(item, index) in menu[selectedMenu[0]].children" :key="item.id">
          <div>
            {{item.name}}
          </div>
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
      menu: [
        {name: '1',
          id: 1,
          children: [
            {name: '2', id: 2}, {name: '2', id: 3}, {name: '2', id: 4}, {name: '2', id: 5}
          ]},
        {name: '3', id: 7}
      ],
      selectedMenu: [0]
    }
  },
  mounted () {
    let level = 1
    comm.indexOfTree2(this.menu, a => {
      debugger
      console.log(a)
      return a.id === 1
    })
  }
}
</script>

<style scoped lang="scss">
  .pieMenu{
    position: relative;height: 20rem;overflow: hidden;
    >.circle{
      position: absolute;border-radius: 100%;
      color: white;text-align: center;top: 0;
      &.circle1{
        z-index: 2;background-color: $blue1
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
