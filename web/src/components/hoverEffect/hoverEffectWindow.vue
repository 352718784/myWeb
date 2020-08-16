<template>
    <div class="hoverEffectWindow">
      <div class="row">
        <hover-effect class="ri-alipay-line hover-button1"></hover-effect>
        <hover-effect class="ri-alipay-line hover-button1 color1"></hover-effect>
        <hover-effect class="ri-alipay-line hover-button1 color2"></hover-effect>
      </div>
      <div class="row">
        <hover-effect2></hover-effect2>
      </div>
    </div>
</template>

<script>
import HoverEffect from './hoverEffect'
import HoverEffect2 from './hoverEffect2'
export default {
  name: 'hoverEffectWindow',
  components: {HoverEffect2, HoverEffect}
}
</script>
<style lang="scss">
  .row{
    display: flex;
  }
  .hover-button1{
    margin: 1rem;border: 1px solid $blue1;color: $blue1;
    .border{
      border: 1px solid $blue1;
    }
    &.color1{
      border-color: $red1;color: $red1;
      .border{
        border: 1px solid $red1;
      }
    }
    &.color2{
      border-color: $green1;color: $green1;
      .border{
        border: 1px solid $green1;
      }
    }
  }
</style>
