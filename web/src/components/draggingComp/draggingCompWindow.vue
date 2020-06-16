<template>
    <div>
      <p>
        vue-draggable、awe-dnd 都是现成的拖拽排序组件,但在使用的过程中总是感觉差一点意思,存在没有过度,直接跳的问题,
        正好vue中封装了一个我个人非常喜欢的组件 tranisiton-group，于是我在改组件基础上封装了一个新的拖拽组件
      </p>
      <p><strong>设计思路：</strong>在最开始的使用，采用了 mousedown mouseup mouseenter mousemove 等事件来触发列表重新排序，随后了解到html中新增了
        drag事件，大大的降低了组件逻辑复杂度。主要流程为 dragstart 触发记录下当前移动元素的index1，dragenter触发记录下拖拽时触碰到的元素index2，
        drop 触发时通过index1 和 index2 对整个数据列表进行重新排序，另外由于props 中传入的数据时数组对象，可以直接修改且不会报错，元素之间的移动则由 transition-group 组件
        处理
      </p>
      <div>
        <p>
          <strong>使用方法：</strong>
        </p>
        <p style="white-space: pre">
          {{code}}
        </p>
        <p>使用v-model 绑定数组，设置操作类型tpye，exchange为数组元素位置互换，insert为拖拽元素插入到移动的位置中，unique设置唯一值，必填，如果为空默认为‘id’，
        可通过作用域插槽对内容做自定义，moveAwayStyle设置触发dragenter的元素的样式</p>
      </div>
      <div>
        <strong>案例：</strong>
        <div class="exp-row">
          <div>
            <dragging-comp key="exp1" v-model="data" type="insert"
                           unique="id" v-slot="scopeVal">
              <template>
                hello：{{scopeVal.data.id}}
              </template>
            </dragging-comp>
            <p>纵向排序(通过父组件样式覆盖)，触碰元素默认样式, 纵向排序的时候会感觉元素运动轨迹不对，emm，这个是错觉，最开始我也以为是bug来着</p>
          </div>
          <div></div>
          <div>
            <dragging-comp key="exp2" v-model="data2" type="exchange"
                           :moveAwayStyle="{transform: 'scale(.6)'}"
                           unique="id" v-slot="scopeVal">
              <template>
                hello：{{scopeVal.data.id}}
              </template>
            </dragging-comp>
            <p>横向排序(通过父组件样式覆盖)，触碰元素设置新的样式</p>
          </div>
        </div>
      </div>
      <div>
        <p><strong>关键代码</strong></p>
        <code-article :code="steps"></code-article>
      </div>
    </div>
</template>

<script>
import DraggingComp from './draggingComp'
import CodeArticle from '../codeArticle/codeArticle'
export default {
  name: 'draggingCompWindow',
  components: {CodeArticle, DraggingComp},
  data () {
    return {
      data: [],
      data2: [],
      code: '<dragging-comp unique="id" v-model="data" type="exchange"\n' +
        '                     :moveAwayStyle="{transform: \'scale(.6)\'}"\n' +
        '                     v-slot="scopeVal">\n' +
        '        <template>\n' +
        '          hello：{{scopeVal.data.id}}\n' +
        '        </template>\n' +
        '      </dragging-comp>',
      steps: [
        {
          code: '  <transition-group name="list-complete"\n' +
            '                    class="list-complete draggingComp" tag="div">\n' +
            '    <div :class="[\'list-complete-item\', dragIndex===index?\'hidden\':\'\']"\n' +
            '         :style="{...dragEnterIndex===index&&dragIndex+1!==index?moveAwayStyle:{}, ...{\'z-index\':data.length-index}}"\n' +
            '         draggable="true"\n' +
            '         :key="item[unique]"\n' +
            '         v-if="item"\n' +
            '         @dragstart="dragstart(index,item)"\n' +
            '         @dragenter="dragenter(index,item)"\n' +
            '         @dragover="dragover"\n' +
            '         @drop="drop($event)"\n' +
            '         v-for="(item, index) in data">\n' +
            '      <slot :data="item">\n' +
            '        hello\n' +
            '      </slot>\n' +
            '    </div>\n' +
            '  </transition-group>',
          remark: '设置transition-group中的name，设置list-complete-enter等样式，监听元素中的drag事件'
        },
        {
          remark: '处理逻辑',
          code: '  methods: {\n' +
            '    // 拖拽开始，记录index\n' +
            '    dragstart (index, item) {\n' +
            '      this.dragIndex = index\n' +
            '    },\n' +
            '    dragenter (index, item) {\n' +
            '      // 在没有拖拽元素时，中断方法，收到其他拖拽元素的影响\n' +
            '      if (this.dragIndex === -1) return\n' +
            '      // 记录下触碰到的元素的index\n' +
            '      if (index !== this.dragIndex) this.dragEnterIndex = index\n' +
            '    },\n' +
            '    dragover (e) {\n' +
            '      // 执行该方法，才能触发drop事件\n' +
            '      e.preventDefault()\n' +
            '    },\n' +
            '    // 拖拽结束，根据类型和记录下的两个index值，对数组进行操作\n' +
            '    drop () {\n' +
            '      if (this.dragEnterIndex !== -1) {\n' +
            '        let item = this.data[this.dragIndex]\n' +
            '        if (this.type === \'insert\') {\n' +
            '          console.log(\'from\', this.dragIndex, \'to\', this.dragEnterIndex)\n' +
            '          this.data.splice(this.dragEnterIndex, 0, item)\n' +
            '          this.data.splice(this.dragEnterIndex < this.dragIndex ? this.dragIndex + 1 : this.dragIndex, 1)\n' +
            '        } else if (this.type === \'exchange\') {\n' +
            '          this.data.splice(this.dragEnterIndex, 1, ...this.data.splice(this.dragIndex, 1, this.data[this.dragEnterIndex]))\n' +
            '        }\n' +
            '      }\n' +
            '      this.dragIndex = -1\n' +
            '      this.dragEnterIndex = -1\n' +
            '    },\n' +
            '    // 为了确保选中的拖动item被清空，在document中监听mousemove，\n' +
            '    checkDragItemClear () {\n' +
            '      if (this.dragIndex !== -1) {\n' +
            '        this.drop()\n' +
            '      }\n' +
            '    }\n' +
            '  },\n' +
            '  // 确保拖拽结束后\n' +
            '  mounted () {\n' +
            '    document.addEventListener(\'mousemove\', this.checkDragItemClear)\n' +
            '  },\n' +
            '  beforeDestroy () {\n' +
            '    document.removeEventListener(\'mousemove\', this.checkDragItemClear)\n' +
            '  }'
        }
      ]
    }
  },
  mounted () {
    for (let i = 0; i < 16; i++) {
      this.data.push({id: i})
      this.data2.push({id: i})
    }
  }
}
</script>

<style scoped lang="scss">
  .exp-row{
    display: flex;
    >div{flex: 1;}
    .draggingComp{
      overflow: scroll;align-content: flex-start;height: 15rem;
      &:first-child{
        flex-direction: column;
      }
    }
  }
</style>
