<template>
    <div class="loadingIcon2 center">
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
      <div class="circle circle1"></div>
      <div :key="item" v-for="item in 13" :class="['circle-other'+item]"></div>
    </div>
</template>

<script>
export default {
  name: 'loadingIcon2'
}
</script>

<style scoped lang="scss">
  $size: 4rem;
  .loadingIcon2{
    filter: url(#gooey);
    /*animation: 6s rotate linear infinite;*/
    @keyframes circle {
      0%{
        border-radius: 50%;
      }
      50%{
        border-radius: 30%;
        transform: scale(1.1);
      }
      100%{
        border-radius: 50%;
      }
    }
    .circle{
      position: absolute;border-radius:100%;width: $size;height: $size;background-color: $green1;
      animation: 2s circle linear infinite;
    }
    @keyframes circle-other {
      0% {
      }
      20% {
        opacity: 1;
      }
      100% {
        transform: translateY(0);opacity: 1;
      }
    }
    @mixin circle-other-style($distance, $deg, $delay) {
      position: absolute;transform: rotateZ($deg);
      &:after{
        content: '';display: block; width: $size/2.5;height: $size/2.5;background-color: $green1;
        animation: $distance/4*1s circle-other linear infinite;animation-delay: $delay;transform: translateY($distance*1rem); opacity: 0;
      }
    }
    .circle-other1{
      @include circle-other-style(20,0deg,0s)
    }
    .circle-other2{
      @include circle-other-style(17,30deg,7s)
    }
    .circle-other3{
      @include circle-other-style(16,60deg,1s)
    }
    .circle-other4{
      @include circle-other-style(26,90deg,4s)
    }
    .circle-other5{
      @include circle-other-style(22,120deg,8s)
    }
    .circle-other6{
      @include circle-other-style(28,150deg,3s)
    }
    .circle-other7{
      @include circle-other-style(18,180deg,6s)
    }
    .circle-other8{
      @include circle-other-style(15,210deg,2s)
    }
    .circle-other9{
      @include circle-other-style(14,240deg,0s)
    }
    .circle-other10{
      @include circle-other-style(26,270deg,5s)
    }
    .circle-other11{
      @include circle-other-style(24,300deg,2s)
    }
    .circle-other12{
      @include circle-other-style(21,330deg,9s)
    }
    .circle-other13{
      @include circle-other-style(25,360deg,1s)
    }
  }
  .svg{
    width: 0;height: 0;
  }
</style>
