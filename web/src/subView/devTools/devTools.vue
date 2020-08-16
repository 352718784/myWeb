<template>
    <article class="devTools">
      <section class="left part">
        <div>
          <el-input v-model="searchValue" size="small"></el-input>
        </div>
        <ol class="left-catalog scroll0">
          <li :key="item.id"
              :class="['catalog-item', selectedItem.id===item.id?'activity':'']"
              @click="startOpenIframe(item)" v-for="item in matchedList">
            {{item.name}}
          </li>
        </ol>
      </section>
      <section class="right part">
        <div class="history">
          <div :key="item.id"
               :class="[selectedItem.id===item.id?'activity':'', 'history-item', 'center']"
               @click="selectedItem=item"
               v-for="(item, index) in history">{{item.name}}
            <i @click="deleteHistory(index)" class="close-btn el-icon-close"></i>
          </div>
        </div>
        <iframe :key="item.id"
                v-show="selectedItem.id===item.id"
                v-for="item in history"
                class="iframe-window"
                :src="item.src"></iframe>
      </section>
    </article>
</template>

<script>
import comm from '@/common/comm'
export default {
  name: 'devTools',
  data () {
    return {
      webSite: [
        {name: '百度', src: 'https://www.baidu.com/'},
        {name: '百度地图3.0开发文档', src: 'http://lbsyun.baidu.com/index.php?title=jspopular3.0'},
        {name: '百度翻译', src: 'https://fanyi.baidu.com/?aldtype=16047#auto/zh'},
        {name: 'VUE', src: 'https://cn.vuejs.org/v2/guide/'},
        {name: 'VUEX', src: 'https://vuex.vuejs.org/zh/installation.html'},
        {name: 'VUERouter', src: 'https://router.vuejs.org/zh/'},
        {name: 'elementUI', src: 'https://element.eleme.cn/#/zh-CN/component/installation'},
        {name: '图标库（remix）', src: 'https://remixicon.cn'},
        {name: '配色网站（渐变色）', src: 'https://webgradients.com/'},
        {name: 'animeJs动画插件', src: 'https://www.animejs.cn/documentation/'},
        {name: '拟态（让你的按钮更立体）', src: 'https://neumorphism.io/#55b9f3'},
        {name: 'axios 中文文档', src: 'https://www.kancloud.cn/yunye/axios/234845'},
        {name: '力扣，训练逻辑思维', src: 'https://leetcode-cn.com/'},
        {name: '蓝狐，设计图稿', src: 'https://lanhuapp.com/web/#/item'},
        {name: 'scss 中文文档', src: 'https://www.sass.hk/docs/'},
        {name: 'VueLoader', src: 'https://vue-loader.vuejs.org/zh/'}
      ],
      selectedItem: false,
      searchValue: '',
      history: []
    }
  },
  methods: {
    deleteHistory (i) {
      this.history.splice(i, 1)
      this.history.length && (this.selectedItem = this.history[0])
    },
    startOpenIframe (item) {
      let index = comm.indexOfObj(this.history, a => a.id === item.id)
      if (index === -1) {
        this.history.push(item)
      }
      this.selectedItem = item
    }
  },
  computed: {
    matchedList () {
      return this.webSite.filter(a => {
        return a.name.indexOf(this.searchValue) !== -1
      })
    }
  },
  created () {
    this.webSite.forEach((a, i) => {
      a.id = i
    })
  }
}
</script>

<style scoped lang="scss">
  .devTools{
    display: flex;height: 100%;color: $fontCol1;
    >.part{
      background-color: $grey4;border-radius: .2rem;
      padding: .5rem;
    }
    >.left{
      width: 15rem;margin: .5rem;
    }
    >.right{
      flex: 1;margin: .5rem .5rem .5rem 0;
      display: flex;flex-direction: column;
    }
    .left-catalog{
      >.catalog-item{
        margin: .5rem;cursor: pointer;user-select: none;
        color: $fontCol2;
        &.activity{
          color: $blue1;font-weight: bold;
        }
      }
    }
    .iframe-window{
      width: 100%;height: 100%;border: unset;background-color: white;
    }
    .history{
      display: flex;
      >.history-item{
        padding: .2rem .5rem;border-radius: .3rem;user-select: none;cursor: pointer;
        &.activity{
          background-color: white;font-weight: bold;
        }
        >.close-btn{
          font-size: .5rem;margin-left: 1rem;font-weight: bold;
        }
      }
    }
  }
</style>
