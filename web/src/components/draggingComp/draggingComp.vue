<template>
  <transition-group name="list-complete"
                    class="list-complete draggingComp" tag="div">
    <div :class="['list-complete-item', dragIndex===index?'hidden':'']"
         :style="{...dragEnterIndex===index&&dragIndex+1!==index?moveAwayStyle:{}, ...{'z-index':data.length-index}}"
         draggable="true"
         :key="item[unique]"
         v-if="item"
         @dragstart="dragstart(index,item)"
         @dragenter="dragenter(index,item)"
         @dragover="dragover"
         @drop="drop($event)"
         v-for="(item, index) in data">
      <slot :data="item">
        hello
      </slot>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'draggingComp',
  props: {
    value: {type: Array, default () { return [] }},
    type: {default: 'insert'}, // insert/exchange
    moveAwayStyle: {type: Object, default () { return { 'transform': 'translate(30%,20%)' } }},
    unique: {default: 'id'}
  },
  data () {
    return {
      data: this.value,
      mouse: {
        down: false,
        move: false
      },
      dragItem: {},
      dragIndex: -1,
      dragEnterIndex: -1
    }
  },
  created () {
  },
  methods: {
    // 拖拽开始，记录index
    dragstart (index, item) {
      this.dragIndex = index
    },
    dragenter (index, item) {
      // 在没有拖拽元素时，中断方法，收到其他拖拽元素的影响
      if (this.dragIndex === -1) return
      // 记录下触碰到的元素的index
      if (index !== this.dragIndex) this.dragEnterIndex = index
    },
    dragover (e) {
      // 执行该方法，才能触发drop事件
      e.preventDefault()
    },
    // 拖拽结束，根据类型和记录下的两个index值，对数组进行操作
    drop () {
      if (this.dragEnterIndex !== -1) {
        let item = this.data[this.dragIndex]
        if (this.type === 'insert') {
          console.log('from', this.dragIndex, 'to', this.dragEnterIndex)
          this.data.splice(this.dragEnterIndex, 0, item)
          this.data.splice(this.dragEnterIndex < this.dragIndex ? this.dragIndex + 1 : this.dragIndex, 1)
        } else if (this.type === 'exchange') {
          this.data.splice(this.dragEnterIndex, 1, ...this.data.splice(this.dragIndex, 1, this.data[this.dragEnterIndex]))
        }
      }
      this.dragIndex = -1
      this.dragEnterIndex = -1
    },
    // 为了确保选中的拖动item被清空，在document中监听mousemove，
    checkDragItemClear () {
      if (this.dragIndex !== -1) {
        this.drop()
      }
    }
  },
  // 确保拖拽结束后
  mounted () {
    document.addEventListener('mousemove', this.checkDragItemClear)
  },
  beforeDestroy () {
    document.removeEventListener('mousemove', this.checkDragItemClear)
  }
}
</script>

<style scoped lang="scss">
  .list-complete{
    display: flex;flex-wrap: wrap;
  }
  .list-complete-item {
    transition: all .5s; padding: .5rem; background-color: $blue1; color: white;
    width: fit-content;user-select: none;margin: .5rem;
    &.hidden{
      opacity: .5;transform: scale(.8);
    }
    &.move-away{
      /*transform: scale(.8);*/
      transform: translate(30% 20%);
    }
  }
  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
</style>
