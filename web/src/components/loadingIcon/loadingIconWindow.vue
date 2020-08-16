<template>
    <div class="loadingIconWindow">
      <loading-icon class="loading"></loading-icon>
      <heart-loading class="loading heart"></heart-loading>
      <loading-icon2 class="loading"></loading-icon2>
    </div>
</template>

<script>
import LoadingIcon from './loadingIcon'
import HeartLoading from './heartLoading'
import LoadingIcon2 from './loadingIcon2'
export default {
  name: 'loadingIconWindow',
  components: {LoadingIcon2, HeartLoading, LoadingIcon},
  mounted () {
    let list = Array(40).fill().map((a, index) => {
      return {id: index}
    })
    console.log(list)
  }
}
</script>

<style scoped lang="scss">
  .loadingIconWindow{
    display: flex;flex-direction: column;
  }
  .loading{
    margin-left: 3rem;
    &.heart{
      margin-bottom: 5rem;
    }
  }
</style>
