<template>
  <div class="hoverEffect2" @mouseenter="startAni" @click="startAni">
    hoverEffect2
  </div>
</template>

<script>
export default {
  name: 'hoverEffect2',
  methods: {
    // 开始动画
    startAni: function (e) {
      console.log('主事件被触发', e.offsetX, e.currentTarget.className)
      let R = Math.sqrt(Math.pow(this.$el.offsetWidth, 2) + Math.pow(this.$el.offsetHeight, 2))
      let x = 0; let y = 0
      if (this.$el.querySelector('.shade')) {
        x = e.clientX - this.elX
        y = e.clientY - this.elY
      } else {
        this.elX = e.clientX - e.offsetX
        this.elY = e.clientY - e.offsetY
        x = e.offsetX
        y = e.offsetY
      }
      let div = document.createElement('div')
      div.classList.add('shade')
      div.style.cssText = `width:${R * 2}px;height:${R * 2}px;left:${x - R}px;top:${y - R}px`
      div.onanimationend = () => {
        div.remove()
      }
      this.$el.appendChild(div)
      return false
    }
  }
}
</script>

<style lang="scss">
  .hoverEffect2{
    background: $blue1;padding: .5rem 1rem;border-radius: .2rem;color: white;
    cursor: pointer;user-select: none;margin: .5rem;position: relative;
    overflow: hidden;
    @keyframes shadeShow {
      from {
        transform: scale(0);opacity: .5;
      }
      to {
        transform: scale(1);opacity: 0;
      }
    }
    >.shade{
      animation: shadeShow 1s;border-radius: 50%;z-index: 0;
      position: absolute;left: 0;top: 0;background: white;opacity: 0;
    }
  }
</style>
