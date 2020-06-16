<template>
    <div class="codeArticle">
      <div :key="index" v-for="(item, index) in code">
        <p><strong>{{item.remark}}</strong></p>
        <div class="code">{{item.code}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'codeArticle',
  props: {
    code: []
  }
}
</script>

<style scoped lang="scss">
.code{
  white-space: pre;
  width: fit-content;background: #333333;color: #84b388;padding: .5rem;
}
</style>
