<template>
    <div class="pieMenuWindow">
      <pie-menu class="menu" :menu="menu"></pie-menu>
<!--      <el-tree :data="menu" :props="defaultProps" default-expand-all>-->
<!--        <span class="custom-tree-node" slot-scope="{ node, data }">-->
<!--          {{data}}-->
<!--        </span>-->
<!--      </el-tree>-->
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
          id: 1,
          children: [
            {name: '1-1',
              id: 2,
              children: [
                {name: '1-1-1', id: 8}, {name: '1-1-2', id: 9}, {name: '1-1-3', id: 10}
              ]},
            {name: '1-2', id: 3, children: [{name: '1-2-1', id: 9}, {name: '1-2-2', id: 10}]}, {name: '1-3', id: 4}, {name: '1-4', id: 5}
          ]},
        {name: '2', id: 7, children: [{name: '2-1', id: 8}]}
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
  }
  .menu{
    position: absolute;left: 50%;top: 0;
  }
</style>
