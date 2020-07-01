<template>
    <div class="loadingIcon">
      <div class="icon">
        <i :key="item" v-for="item in 6" :style="{'animation-delay': `${item*0.3-0.3}s`}"></i>
      </div>
      <svg class="svg">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
          <feColorMatrix
            values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 20 -10
            "/>
        </filter>
      </svg>
    </div>
</template>

<script>
export default {
  name: 'loadingIcon'
}
</script>

<style scoped lang="scss">
  .loadingIcon{
    position: relative;
    height: fit-content;
  }
  .svg{
    width: 0;height: 0;
  }
  .text{
    bottom: 0;
    text-align: center;position: absolute;color: white;width: 100%;
  }
  .gooey{
    width: 0;height: 0;
  }
  .icon{
    width: 10rem; height: 10rem;
    position: relative;
    $size: 2rem;
    filter: url(#gooey);
    >.box{
      width: 100%; background-color: #3a8ee6;
      position: absolute;bottom: 0; height: 3rem;
    }
    >i{
      position: absolute;top:0;left: 0;width: 100%;height: 100%;
      animation: animate 4s ease-in-out infinite;
      display: flex; justify-content: center;
      &:before{
        content: '';position: absolute;top: 0;
        width: $size;height: $size;
        box-shadow: 0 0 0.1rem #3a8ee6;
        background: linear-gradient(#3a8ee6, #3a8ee6);border-radius: 100%;
      }
    }
    @keyframes animate {
      0% {transform: rotate(0deg)}
      70%, 100% {transform: rotate(360deg)}
    }
  }
</style>
