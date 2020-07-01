<template>
    <div class="heartLoading center">
      <div class="part1 part"></div>
      <div class="part2 part"></div>
      <div class="part3 part"></div>
      <div class="part4"></div>
    </div>
</template>

<script>
export default {
  name: 'heartLoading'
}
</script>

<style scoped lang="scss">
  .heartLoading{
    position: relative;width: 3rem; height: 3em;
    @keyframes part1 {
      from {
        transform: translateX(0) scale(.2);
      }
      to {
        transform: translateX(-25%) scale(1);
      }
    }
    @keyframes part2 {
      from {
        transform: translateX(0) scale(.2);
      }
      to {
        transform: translateX(25%) scale(1);
      }
    }
    @keyframes part3 {
      from {
        transform: translateY(0) scale(.1) rotate(45deg);
        border-radius: 100%;
      }
      to {
        transform: translateY(25%) rotate(45deg) scale(1);
      }
    }
    @keyframes part4 {
      from {
        transform: scale(.3);background-color: #c7c7c7;
      }
      to {
        transform: scale(1);background-color: #a7a7a7;
      }
    }
    >.part{
      position: absolute; height: 100%;width: 100%; background-color: $red1;
      &.part1{
        border-radius: 100%;transform: translateX(-25%);
        animation: part1 1s infinite alternate;
      }
      &.part2{
        border-radius: 100%;transform: translateX(25%);
        animation: part2 1s infinite alternate;
      }
      &.part3{
        background-color: $red1;
        transform: translateY(25%) rotate(45deg);border-radius: 0.3rem;
        animation: part3 1s infinite alternate;
      }
    }
    >.part4{
      position: absolute;width: 75%;height: 20%;border-radius: 100%;
      top: 190%;animation: part4 1s infinite alternate;
    }
  }
</style>
