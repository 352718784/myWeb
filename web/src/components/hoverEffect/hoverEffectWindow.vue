<template>
    <div>
      <hover-effect class="ri-alipay-line hover-button1"></hover-effect>
    </div>
</template>

<script>
import HoverEffect from './hoverEffect'
export default {
  name: 'hoverEffectWindow',
  components: {HoverEffect}
}
</script>

<style lang="scss">
  .hover-button1{
    margin: 1rem;
    border: 1px solid $blue1;color: $blue1;
    .border{
      border: 1px solid $blue1;
    }
  }
</style>
