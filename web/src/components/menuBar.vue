<template>
    <ol class="menuBar">
      <li @click="$router.push(item.id)"
          :data-id="item.id" :key="item.id"
          :class="{activity: page === item.id}"
          v-for="item in menuList">{{item.name}}</li>
      <div class="bar"></div>
    </ol>
</template>

<script>
import anime from 'animejs'
export default {
  name: 'menuBar',
  props: {
    value: ''
  },
  computed: {
    page () {
      this.$nextTick(() => {
        this.paging(this.$route.path)
      })
      return this.$route.path
    }
  },
  data () {
    return {
      menuList: [
        {name: '主页', id: '/mainView/mainPage'},
        {name: '开发工具', id: '/mainView/devTools'},
        {name: 'demo样例', id: '/mainView/demoExample'}
      ]
    }
  },
  methods: {
    paging (tag) {
      let dom = this.$el.querySelector(`[data-id="${tag}"]`)
      let bar = this.$el.querySelector('.bar')
      anime({
        targets: bar,
        left: dom.offsetLeft,
        width: dom.offsetWidth,
        duration: 1000
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .menuBar{
    display: flex;position: relative;user-select: none;
    >li{
      margin: .5rem 1rem;cursor: pointer;color: gray;
      &.activity{
        color: #313131;
      }
    }
    >.bar{
      position: absolute;bottom: 0;height: .2rem;background-color: #3a8ee6;
      left: 0;border-radius: 1rem;
    }
  }
</style>
