<template>
    <div class="parallax-net" @scroll.prevent="scroll">
      <section class="img-list center">
        <img :style="{top: p1}" class="img" src="static/image/p1.jpg">
        <img :style="{left: p2}" class="img" src="static/image/p2.png">
        <img :style="{top: p3}" class="img" src="static/image/p3.png">
        <h2 class="title" :style="{top: p5}">
          MOON
        </h2>
        <img :style="{top: p4}" class="img" src="static/image/p4.png">
      </section>
      <section class="text">
        <p>
          偶尔在网上看到这种利用视觉差做的网页，实现效果简单，却能让整个网站生动起来，于是照着网上的例子也写了一个，
          设置图片为绝对定位， 之后监听窗口scroll事件，读取<strong>scrollTop</strong>值，根据scrollTop的值分别设置
          图片的top值或者left。
        </p>
        <p>
          另外 使用了css中的 mix-blend-mode 属性，具体使用教程可查看该路径
          <a target="_blank" href="https://www.runoob.com/cssref/pr-mix-blend-mode-html.html"> https://www.runoob.com/cssref/pr-mix-blend-mode-html.html</a>
        </p>
      </section>
    </div>
</template>

<script>
export default {
  name: 'parallax',
  data () {
    return {
      scrollVal: 0
    }
  },
  computed: {
    p1 () {
      return this.scrollVal * 0.5 + 'px'
    },
    p2 () {
      return -this.scrollVal * 0.5 + 'px'
    },
    p3 () {
      return -this.scrollVal * 0.15 + 'px'
    },
    p4 () {
      return this.scrollVal * 0.15 + 'px'
    },
    p5 () {
      return this.scrollVal * 1 + 'px'
    }
  },
  methods: {
    scroll (e) {
      this.scrollVal = e.target.scrollTop
      console.log('hello', e.target.scrollTop)
    }
  }
}
</script>

<style scoped lang="scss">
  .parallax-net {
    overflow: scroll; height: 100%; background-color: #0a2a43;
    display: flex;flex-direction: column;
  }
  .img-list{
    position: relative;height: 100%;overflow: hidden;flex-shrink: 0;
    >.img{
      position: absolute;object-fit: cover;pointer-events: none;
      width: 100%; height: 100%;
    }
    >.title{
      position: relative;color: #ffffff;font-size: 10em;
    }
    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: #0a2a43;
      mix-blend-mode: color;
    }
  }
  .text{
    height: 100%;flex-shrink: 0;color: white;
    a {
      color: white; transform: scale(1.2);font-weight: bold;
    }
  }
</style>
