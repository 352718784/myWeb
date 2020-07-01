<template>
    <div>
      <loading-icon class="loading1"></loading-icon>
      <heart-loading class="loading1"></heart-loading>
    </div>
</template>

<script>
import LoadingIcon from './loadingIcon'
import HeartLoading from './heartLoading'
export default {
  name: 'loadingIconWindow',
  components: {HeartLoading, LoadingIcon},
  mounted () {
    let list = Array(40).fill().map((a, index) => {
      return {id: index}
    })
    console.log(list)
  }
}
</script>

<style scoped lang="scss">
  .loading1{
    margin-left: 3rem;
  }
</style>
