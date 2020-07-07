<template>
    <div class="canvasDemo1">
      <div class="operate">
        <el-button @click="test(ctx)">test</el-button>
        <el-button @click="drawCircle(ctx)">drawCircle</el-button>
      </div>
      <canvas id="canvas" width="500" height="500"></canvas>
    </div>
</template>

<script>
export default {
  name: 'canvasDemo1',
  data () {
    return {
      ctx: false,
      zero: [500, 500]
    }
  },
  mounted () {
    let canvas = this.$el.querySelector('#canvas')
    canvas.width = this.$el.offsetWidth
    canvas.height = this.$el.offsetHeight
    this.ctx = canvas.getContext('2d')
  },
  methods: {
    drawCircle (ctx) {
      let R = 120
      let r = 100
      ctx.arc(this.zero[0], this.zero[1], r, 0, Math.PI * 2, true)
      ctx.stroke()
      new Array(12).fill().forEach((a, i) => {
        let deg = Math.PI / 6 * (i + 1)
        ctx.fillText(i + 1, Math.sin(deg) * R + this.zero[0] - 5, this.zero[1] - Math.cos(deg) * R + 5)
        ctx.fillText('.', Math.sin(deg) * R + this.zero[0], this.zero[1] - Math.cos(deg) * R)
      })
    },
    test (ctx) {
      ctx.font = '38px Arial'
      ctx.fillText('hello', 100, 200)
      ctx.strokeText('hello', 300, 200)
    }
  }
}
</script>

<style scoped lang="scss">
  .canvasDemo1{
    width: 100%;height: 100%;position: relative;
    >.operate{
      position: absolute;top: 0;left: 0;width: 100%;
    }
    #canvas{
    }
  }
</style>
