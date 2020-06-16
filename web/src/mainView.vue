<template>
    <div class="main-view">
      <menu-bar></menu-bar>
      <article class="sub-view">
        <transition name="fade" mode="out-in" >
          <keep-alive>
            <router-view class="fade-item"></router-view>
          </keep-alive>
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
      flex: 1;position: relative; overflow: hidden;
    }
    .fade-item{
      transition: all .3s;
    }
    .fade-enter-active, .fade-leave-active {
      transform: translateX(0);
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;transform: translateX(-5rem);
    }
  }
</style>
