<template>
    <div class="main-view">
      <section class="user">
         <i class="ri-user-3-fill" @click="$router.push({path: '/mainView/mainPage'})"></i>
      </section>
      <menu-bar></menu-bar>
      <article class="sub-view">
        <transition name="fade" >
          <router-view class="fade-item"></router-view>
        </transition>
      </article>
    </div>
</template>

<script>
import MenuBar from './components/menuBar'
export default {
  name: 'mainView',
  components: {MenuBar},
  data () {
    return {
      menuList: [
        {index: '/mainView/mainPage', name: '主页'},
        {index: '/mainView/devTools', name: '开发工具', path: '/mainView/devTools'}
      ],
      defaultActive: ''
    }
  },
  mounted () {
    this.defaultActive = this.$route.path
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .main-view{
    height: 100%; width: 100%;
    display: flex;flex-direction: column;
    >.user{
    }
    >.menu-bar{
      display: flex;
      >li{
        margin: .5rem 1rem;
      }
    }
    .sub-view {
      flex: 1;position: relative;
    }
    .fade-item{
      transition: all .5s;
    }
    .fade-enter-active, .fade-leave-active {
      transform: translateX(0);
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;transform: translateX(-5rem);
    }
    .fade-leave-active {
      position: absolute;
    }
  }
</style>
