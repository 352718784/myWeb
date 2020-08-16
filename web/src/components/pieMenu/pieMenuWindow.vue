<template>
    <div class="pieMenuWindow">
      <pie-menu class="menu" :menu="menu" v-slot="item">
        <i :class="[item.data.icon, 'center', item.data.level===2?'blue':'white']"></i>
      </pie-menu>
    </div>
</template>

<script>
import PieMenu from './pieMenu'
export default {
  name: 'pieMenuWindow',
  data () {
    return {
      menu: [
        {name: '1',
          id: 1, icon: 'ri-rocket-fill',
          children: [
            {name: '1-1',
              id: 2,icon: 'ri-rocket-2-fill',
              children: [
                {name: '1-1-1', icon: 'ri-earth-line', id: 8}, {name: '1-1-2', icon: 'ri-parking-box-line', id: 9}, {name: '1-1-3', icon: 'ri-police-car-line', id: 10}
              ]},
            {name: '1-2', icon: 'ri-bus-line', id: 3, children: [{name: '1-2-1', icon: 'ri-e-bike-line', id: 9}, {name: '1-2-2', icon: 'ri-flight-takeoff-fill', id: 10}]}, {name: '1-3', icon: 'ri-sailboat-line', id: 4}, {name: '1-4', icon: 'ri-bike-line', id: 5}
          ]},
        {name: '2', icon: 'ri-ship-fill', id: 7, children: [{name: '2-1', icon: 'ri-traffic-light-line', id: 8}]}
      ],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id'
      }
    }
  },
  components: {PieMenu}
}
</script>

<style scoped lang="scss">
  .pieMenuWindow{
    position: relative;
    i{
      width: 2rem; height: 2rem; color: white;font-size: 1.5rem;
      &.blue{
        color: $blue1;
      }
      &.white{
        color: white;
      }
    }
  }
  .menu{
    position: absolute;left: 50%;top: 0;
  }
</style>
