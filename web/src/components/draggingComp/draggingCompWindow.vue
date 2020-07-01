<template>
    <div class="draggingCompWindow">
      <nav class="nav-bar">
        <div @click="changeVersion(item, $event)" :class="['column', version===item?'activity':'']"
             v-for="item in versions" :key="item">{{item}}</div>
        <div class="nothing" ref="nothing"></div>
      </nav>
      <template v-if="version===versions[0]">
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
      </template>
      <template v-else-if="version===versions[1]">
        <dragging-comp2 :draggable="true" componentId="exp1" type="exchange"
                        v-slot="scopeVal" ref="draggingComp2" v-model="data3">
          <div style="margin: .5rem">hello, 2.0. id:{{scopeVal.data.id}}</div>
        </dragging-comp2>
        <div class="add-area">
          <div v-able-draped-el="{key: 'exp1', value: test}"
               draggable="false"
               class="test-block">通过 draggable 属性控制该元素是否可以拖动</div>
          <div v-able-draped-el="{key: 'exp1', value: test}"
               draggable="true"
               class="test-block">拖拽该区域可以新增数据</div>
        </div>
        <p>感谢 <strong>html5权威指南</strong> 这本中对拖拽事件的详细描述，之后对拖拽组件进行了优化，同时新增了全局自定义指令 v-able-draped-el，使用了改指令的元素能拖拽并添加到目标列表中</p>
        <p><strong>设计思路：</strong>
          组件内元素dragstart的时候记录下当前元素的index，在dragenter和dragover中记录下触碰到的元素的index（为了避免在dragenter中没有触发到事件，所以在dragover中执行了同样的逻辑）
          在drop的时候，通过记录下的两个index对数组列表进行处理，在dragend的时候重置所有数据，另外为了保证重置数据，监听了mousemove事件的
        </p>
        <div>
          <strong>使用方法：</strong>
          <code-article :code="code1"></code-article>
        </div>
        <div>
          <strong>关键代码：</strong>
          <code-article :code="code2"></code-article>
        </div>
      </template>
    </div>
</template>

<script>
import DraggingComp from './draggingComp'
import CodeArticle from '../codeArticle/codeArticle'
import DraggingComp2 from './draggingComp2'
export default {
  name: 'draggingCompWindow',
  components: {DraggingComp2, CodeArticle, DraggingComp},
  data () {
    return {
      versions: ['1.0版本', '2.0版本'],
      version: '2.0版本',
      data: [],
      data2: [],
      data3: [],
      data4: [],
      code1: [
        {
          code: '<dragging-comp2 :draggable="true" unique="id" componentId="exp2" type="exchange"\n' +
            '                        v-able-draped-el="{key: \'exp1\', value: test}"\n' +
            '                        v-slot="scopeVal" v-model="data4">\n' +
            '          <div style="margin: .5rem">hello, 2.0. id:{{scopeVal.data.id}}</div>\n' +
            '        </dragging-comp2>',
          remark: 'draggable：控制元素是否可以拖拽 - componentId：设置组件id，在自定义指令中需要用到 - unique：非常重要，他是用于设置元素唯一值的属性名，默认是id- 作用域插槽'},
        {
          code: '<div v-able-draped-el="{key: \'exp1\', value: creatNewItem}"\n' +
            '               :draggable="false"\n' +
            '               class="test-block">通过 draggable 属性控制该元素是否可以拖动</div>',
          remark: 'v-able-draped-el 绑定 1.key:只有key值和componentId一致，该元素才能拖拽到组件中进行新增操作。2.value：可以绑定function或者object，绑定后，新增的数据为value中绑定的数据'
        }
      ],
      code2: [
        {
          code: '<transition-group name="list-complete"\n' +
            '                    class="list-complete draggingComp" tag="div">\n' +
            '    <div :class="[\'list-complete-item\', dragIndex===index?\'hidden\':\'\']"\n' +
            '         :style="{\'z-index\':data.length-index}"\n' +
            '         :draggable="draggable"\n' +
            '         :key="item[unique]"\n' +
            '         v-if="item"\n' +
            '         @dragstart="dragstart(index,$event)"\n' +
            '         @dragenter="dragenter(index,$event)"\n' +
            '         @dragover="dragover($event, index)"\n' +
            '         @drop="drop"\n' +
            '         @dragleave="dragEnterIndex=-1"\n' +
            '         @dragend="dragend"\n' +
            '         v-for="(item, index) in data">\n' +
            '      <div class="inner-box" :style="dragEnterIndex===index?moveAwayStyle:{}">\n' +
            '        <slot :data="item">\n' +
            '          hello\n' +
            '        </slot>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </transition-group>',
          remark: '拖拽组件模板，监听drag事件，设置作用域插槽'
        },
        {
          code: '  methods: {\n' +
            '    // 拖拽开始，记录index\n' +
            '    dragstart (index, e) {\n' +
            '      this.dragIndex = index\n' +
            '    },\n' +
            '    dragenter (index, e) {\n' +
            '      // 记录下触碰到的元素的index\n' +
            '      if (index !== this.dragIndex) this.dragEnterIndex = index\n' +
            '    },\n' +
            '    dragover (e, index) {\n' +
            '      if (index !== this.dragIndex) this.dragEnterIndex = index\n' +
            '      // 执行该方法，才能触发drop事件\n' +
            '      e.preventDefault()\n' +
            '    },\n' +
            '    drop (e) {\n' +
            '      let target = e.dataTransfer.getData(this.componentId)\n' +
            '      if (this.dragEnterIndex === -1) {\n' +
            '        console.log(\'没有发现插入位置，跳过\')\n' +
            '      } else {\n' +
            '        if (target && this.dragIndex === -1) {\n' +
            '          target = JSON.parse(target)\n' +
            '          console.log(\'开始新增数据\', target)\n' +
            '          if (!target[this.unique]) console.log(\'数据类型与列表不符合，停止新增\')\n' +
            '          let index = comm.indexOfObj(this.data, a => a[this.unique] === target[this.unique])\n' +
            '          if (index !== -1) console.log(\'存在重复key，停止新增\')\n' +
            '          this.data.splice(this.dragEnterIndex, 0, target)\n' +
            '          console.log(\'新增成功，开始重置数据\')\n' +
            '          e.dataTransfer.clearData(this.componentId)\n' +
            '          this.dragend()\n' +
            '        } else if (this.dragIndex !== -1) {\n' +
            '          console.log(\'开始重新对数组排序\')\n' +
            '          let item = this.data[this.dragIndex]\n' +
            '          if (this.type === \'insert\') {\n' +
            '            console.log(\'from\', this.dragIndex, \'to\', this.dragEnterIndex)\n' +
            '            this.data.splice(this.dragEnterIndex, 0, item)\n' +
            '            this.data.splice(this.dragEnterIndex < this.dragIndex ? this.dragIndex + 1 : this.dragIndex, 1)\n' +
            '          } else if (this.type === \'exchange\') {\n' +
            '            this.data.splice(this.dragEnterIndex, 1, ...this.data.splice(this.dragIndex, 1, this.data[this.dragEnterIndex]))\n' +
            '          }\n' +
            '          this.dragend()\n' +
            '        }\n' +
            '      }\n' +
            '    },\n' +
            '    // 拖拽结束，根据类型和记录下的两个index值，对数组进行操作\n' +
            '    dragend () {\n' +
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
            '    document.addEventListener(\'mousemove\', this.dragend)\n' +
            '  },',
          remark: '拖拽的内部代码，需要注意的是，在拖拽事件中的dataTransfer 设置数据后，只有在drop中才能读取到'
        },
        {
          code: 'Vue.directive(\'ableDrapedEl\', {\n' +
            '      bind (el, binding) {\n' +
            '        let type = typeof binding.value.value\n' +
            '        // el.setAttribute(\'draggable\', true)\n' +
            '        el.addEventListener(\'dragstart\', (e) => {\n' +
            '          let val = JSON.stringify(type === \'function\' ? binding.value.value() : binding.value.value)\n' +
            '          e.dataTransfer.setData(binding.value.key, val)\n' +
            '        })\n' +
            '      }\n' +
            '    })',
          remark: '组测全局组件，在bind中绑定方法'
        }
      ],
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
  methods: {
    test () {
      return {id: 'v-able-draped-el' + new Date().getTime()}
    },
    dragstart (e) {
      e.dataTransfer.setData('componentId1', JSON.stringify({id: new Date().getTime()}))
    },
    changeVersion (val, e) {
      this.version = val
      let el = e.currentTarget
      this.$refs.nothing.style.cssText = `width: ${el.offsetWidth}px;left: ${el.offsetLeft}px`
    }
  },
  mounted () {
    for (let i = 0; i < 16; i++) {
      this.data.push({id: i})
      this.data2.push({id: i})
      this.data3.push({id: i})
      this.data4.push({id: i})
    }
  }
}
</script>

<style scoped lang="scss">
  .add-area{
    display: flex;
    >.test-block{
      width: fit-content;padding: .5rem;margin: .5rem;color: white;background-color: $red1;
    }
  }
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
  .nav-bar{
    display: flex;position: relative;
    >.column{
      margin: .2rem;padding: .3rem .5rem;cursor: pointer;z-index: 1;
      transition: color .5s;
      &.activity{font-weight: bold;color: white}
    }
    >.nothing{
      position: absolute;height: 100%; width: 0;z-index: 0;
      transition: all .5s; background-color: $blue1;border-radius: .2rem;
    }
  }
</style>
