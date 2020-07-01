<template>
  <transition-group name="list-complete"
                    class="list-complete draggingComp" tag="div">
    <div :class="['list-complete-item', dragIndex===index?'hidden':'']"
         :style="{'z-index':data.length-index}"
         :draggable="draggable"
         :key="item[unique]"
         v-if="item"
         @dragstart="dragstart(index,$event)"
         @dragenter="dragenter(index,$event)"
         @dragover="dragover($event, index)"
         @drop="drop"
         @dragleave="dragEnterIndex=-1"
         @dragend="dragend"
         v-for="(item, index) in data">
      <div class="inner-box" :style="dragEnterIndex===index?moveAwayStyle:{}">
        <slot :data="item">
          hello
        </slot>
      </div>
    </div>
  </transition-group>
</template>

<script>
import comm from '../../common/comm'
export default {
  name: 'draggingComp2',
  props: {
    value: {type: Array, default () { return [] }},
    type: {default: 'insert'}, // insert/exchange
    moveAwayStyle: {type: Object, default () { return { 'transform': 'scale(1.2)' } }},
    unique: {default: 'id'},
    componentId: {default: 'componentId1'},
    draggable: {default: true}
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
    dragstart (index, e) {
      this.dragIndex = index
    },
    dragenter (index, e) {
      // 记录下触碰到的元素的index
      if (index !== this.dragIndex) this.dragEnterIndex = index
    },
    dragover (e, index) {
      if (index !== this.dragIndex) this.dragEnterIndex = index
      // 执行该方法，才能触发drop事件
      e.preventDefault()
    },
    drop (e) {
      let target = e.dataTransfer.getData(this.componentId)
      if (this.dragEnterIndex === -1) {
        console.log('没有发现插入位置，跳过')
      } else {
        if (target && this.dragIndex === -1) {
          target = JSON.parse(target)
          console.log('开始新增数据', target)
          if (!target[this.unique]) console.log('数据类型与列表不符合，停止新增')
          let index = comm.indexOfObj(this.data, a => a[this.unique] === target[this.unique])
          if (index !== -1) console.log('存在重复key，停止新增')
          this.data.splice(this.dragEnterIndex, 0, target)
          console.log('新增成功，开始重置数据')
          e.dataTransfer.clearData(this.componentId)
          this.dragend()
        } else if (this.dragIndex !== -1) {
          console.log('开始重新对数组排序')
          let item = this.data[this.dragIndex]
          if (this.type === 'insert') {
            console.log('from', this.dragIndex, 'to', this.dragEnterIndex)
            this.data.splice(this.dragEnterIndex, 0, item)
            this.data.splice(this.dragEnterIndex < this.dragIndex ? this.dragIndex + 1 : this.dragIndex, 1)
          } else if (this.type === 'exchange') {
            this.data.splice(this.dragEnterIndex, 1, ...this.data.splice(this.dragIndex, 1, this.data[this.dragEnterIndex]))
          }
          this.dragend()
        }
      }
    },
    // 拖拽结束，根据类型和记录下的两个index值，对数组进行操作
    dragend () {
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
    document.addEventListener('mousemove', this.dragend)
  },
  beforeDestroy () {
    document.removeEventListener('mousemove', this.dragend)
  }
}
</script>

<style scoped lang="scss">
  .list-complete{
    display: flex;flex-wrap: wrap;
  }
  .list-complete-item {
    transition: all .5s;width: fit-content;user-select: none;
    &.hidden{
      opacity: .5;transform: scale(.8);
    }
    &.move-away{
      /*transform: scale(.8);*/
      transform: translate(30% 20%);
    }
    >.inner-box{
      transition: all .5s;background-color: $blue1;color: white;
      display: flex;margin: .5rem;
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
