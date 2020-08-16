<template>
    <div class="KSHExample">
      <el-button @click="getBody">getBody</el-button>
<!--      <iframe src="http://localhost:8081/#/mainView/mainPage"></iframe>-->
      <iframe src="https://10.67.24.183/show.html?sid=fdf56fb1-2649-457e-ba88-e89f35f4abc7&projectMarker=iDtNvdtm"></iframe>
    </div>
</template>

<script>
export default {
  name: 'KSHExample',
  methods: {
    getBody () {
      let iframe = this.$el.querySelector('iframe').contentWindow.document
      let body = iframe.querySelector('body')
      console.log('hsq', iframe, body)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
  iframe{
    width: 87rem;height: 42rem;
  }
</style>
