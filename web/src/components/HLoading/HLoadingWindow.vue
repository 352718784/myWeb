<template>
    <div class="HLoadingWindow">
      <h4>v-h-loading使用案例，开发环境可直接使用</h4>
      <el-button @click="loading = !loading">loading = !loading</el-button>
      <el-button @click="empty=!empty">empty=!empty</el-button>
      （loading: {{loading}}  empty: {{empty}}）
      <div class="h-loading-window" v-h-loading="{loading: loading, empty: empty}"></div>
      <section>
        <h4>7月21号更新</h4>
        <p>改指令会在绑定过程中对节点添加 position: relative 的样式，同时如果该节点可以滚动，会造成背景图片也可以被滚动</p>
        <p>针对这个问题，进行了优化，在初始化和更新过程中，如果loading 或 empty 为 true， 对节点添加样式<strong> position: relative;overflow: hidden; </strong> ，同时mask组件监听了afterLeave事件，
        该事件触发时，如果loading和empty均为false，对节点移除样式</p>
      </section>
      <el-divider>我是分割线</el-divider>
      <section>
        <h4>使用方法：</h4>
        <p>需要绑定一个对象，loading 和 empty 属性名暂时不可修改，通过控制对于属性的true 或 false，页面设置为加载中状态或者无数据状态</p>
        <img src="static/image/hl1.png">
        <h4>关键代码</h4>
        <p>创建一个vue 组件构建类 Mask</p>
        <img src="static/image/hl2.png">
        <p>注册全局指令，主要使用bind，update，unbind三个钩子函数，在bind中实例组件mask，设置初始状态并将生成的dom节点挂载到目标目标dom下，并设置class，
        之后只需要监听指令所在组件的更新，设置loading empty状态即可</p>
        <img src="static/image/hl3.png">
        <p>全局样式，实际开发中按需求进行覆盖</p>
        <img src="static/image/hl4.png">
      </section>
    </div>
</template>

<script>
export default {
  name: 'HLoadingWindow',
  data () {
    return {
      loading: true,
      empty: true
    }
  },
  methods: {
    test () {
      this.loading = !this.loading
      console.log(this.loading)
    }
  }
}
</script>

<style scoped lang="scss">
  .window{
    height: 10rem;width: 10rem;margin: .5rem;
    background-color: $red1;
  }
  .h-loading-window{
    height: 30rem;width: 100%;margin: .5rem;
    background-color: white;overflow: hidden;
  }
</style>
