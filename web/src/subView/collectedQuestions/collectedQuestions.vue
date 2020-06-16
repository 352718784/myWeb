<!--<template>-->
<!--    <article class="collectedQuestions">-->
<!--      <section class="querstion">-->
<!--        <p>错误：项目引入sass，dev运行异常，抛出异常</p>-->
<!--        <p class="code">-->
<!--          * !!vue-style-loader!css-loader?{"minimize":false,"sourceMap":false}!../../node_modules/vue-loader/lib/style-compiler/index?{"vue":true,"id":"data-v-1d57e5ea","scoped":false,"hasInlineConfig":false}!stylus-loader?{"sourceMap":false}!../../node_modules/vue-loader/lib/selector?type=styles&index=0!./a.vue in ./src/components/a.vue-->
<!--        </p>-->
<!--        <p>解决方法：确认sass-loader，node-loader，style-loader等依赖安装完成，确认全部安装完成后，检查sass版本，过高的版本-->
<!--        也有可能引发上述问题，当前项目使用的sass-loader版本为<em class="red">7.3.1</em></p>-->
<!--      </section>-->
<!--    </article>-->
<!--</template>-->

<script>
export default {
  name: 'collectedQuestions',
  data () {
    return {
      name: 'collectedQuestions'
    }
  },
  mounted () {
    console.log(this)
  },
  render (createElement, context) {
    console.log('hsq', this, context)
    return createElement('p', [this.name,
      createElement('el-button', {
        on: {click: (e) => { console.log(this, e); this.name = 'hello' }}
      }, '按钮')])
  }
}
</script>

<style scoped lang="scss">
.collectedQuestions{
  padding: .5rem;
  .querstion{
    margin: .5rem;
    p{
     margin: .5rem 0;
    }
  }
  .red{
    color: $red1; font-weight: bold;
  }
}
</style>
