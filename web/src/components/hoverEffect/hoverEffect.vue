<template>
    <i class="hoverEffect">
      <i :key="item" v-for="item in 4" class="border"></i>
    </i>
</template>

<script>
export default {
  name: 'hoverEffect'
}
</script>

<style scoped lang="scss">
  .hoverEffect{
    $duration: .3s;
    font-size: 1.5rem;height: 2rem;width: 2rem;
    display: flex;align-items: center;justify-content: center;
    position: relative;border-radius: .2rem;
    counter-reset:section;transition: all $duration;
    &:hover{
      transform: rotate(-35deg) skew(20deg);
      >.border{
        &:nth-child(1){
          transform: translate(-10%, 10%);opacity: .7;
        }
        &:nth-child(2){
          transform: translate(-20%, 20%);opacity: .5;
        }
        &:nth-child(3){
          transform: translate(-30%, 30%);opacity: .3
        }
        &:nth-child(4){
          transform: translate(-40%, 40%);opacity: .1
        }
      }
    }
    >.border{
      width: 100%; height: 100%;position: absolute;
      border-radius: .2rem;
      left: 0;top:0;opacity: 0;transition: all $duration;
    }
  }
</style>
