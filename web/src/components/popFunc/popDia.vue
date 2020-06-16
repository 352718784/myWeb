<template>
  <transition name="fade">
    <div class="popDia" @mouseenter="$emit('show')" v-show="show">
      <slot>Submit</slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'popDia',
  props: {
    show: {type: Boolean, default: false}
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.popDia{
  position: absolute;padding: .5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: .2rem;
  color: #606266;background-color: white;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
