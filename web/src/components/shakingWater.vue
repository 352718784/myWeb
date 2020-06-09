<template>
  <div class="shakingWater" @mouseenter="startPlay">
    <svg class="wave" :width="w" :height="h" xmlns="http://www.w3.org/2000/svg">
      <path :style="{transform: `translateY(${progress}px)`}" fill="url(#color)"
            class="wave1" :d="path[1]"></path>
      <defs>
        <linearGradient id="color" x1="0" y1="0" x2="0" :y2="h" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="rgb(114,233,228)"/>
          <stop offset="100%" stop-color="rgb(92,189,253)"/>
        </linearGradient>
      </defs>
    </svg>
    <div class="point" :key="item" v-for="item in 20"></div>
    <div class="number">{{num}}%</div>
  </div>
</template>

<script>
import anime from 'animejs';
export default {
  name: 'shakingWater',
  props: {
    value: {default: 80}
  },
  data () {
    return {
      w: 600,
      h: 200,
      waveH: 20,
      num: parseInt(this.value)
    }
  },
  computed: {
    path () {
      let w = this.w / 8
      let a = this.waveH
      let top = 1
      return [
        `M 0 ${top + a} Q ${w} ${top} ${w * 2} ${top + a} Q ${w * 3} ${top + 2 * a}  ${w * 4} ${top + a} Q ${w * 5} ${top}  ${w * 6} ${top + a} Q ${w * 7} ${top + 2 * a}  ${w * 8} ${top + a} V${this.h + 10} H0 Z`,
        `M 0 ${top + a} Q ${w} ${top + a} ${w * 2} ${top + a} Q ${w * 3} ${top + a}  ${w * 4} ${top + a} Q ${w * 5} ${top + a}  ${w * 6} ${top + a} Q ${w * 7} ${top + a}  ${w * 8} ${top + a} V${this.h + 10} H0 Z`
      ];
    },
    progress(){
      return (100 - this.num) * (this.h - this.waveH * 2) / 100
    }
  },
  methods:{
    startPlay(){
      let w = this.w / 8;
      anime({
        targets: '.wave1',
        easing: 'easeOutQuart',
        duration: 5000,
        begin(){
          anime({
            targets: '.wave',
            easing: 'linear',
            duration: 500,
            loop: 10,
            translateX: [
              {value: 0, duration: 0},
              {value: -w * 4}
            ]
          });
        },
        d: [
          {value: this.path[0], duration: 1000},
          {value: this.path[1]}
        ]
      });
    },
    startplay2(){
      let dom = this.$el.querySelectorAll('.point');
      let window = this.$el;
      anime.set(dom, {
        translateX(){
          return anime.random(-10, window.offsetWidth + 10);
        },
        scale(){
          return anime.random(2, 10) / 10;
        },
        opacity(){
          return anime.random(1, 8) / 10;
        }
      });
      dom.forEach(d => {
        let Y = anime.random(-window.offsetHeight / 3, -window.offsetHeight);
        let options = {
          targets: [d],
          duration(){
            return anime.random(1000, 5000);
          },
          delay(){
            return anime.random(0, 2000);
          },
          translateY: [0, Y],
          easing: 'linear',
          loop: true,
          direction: 'normal'
        };
        anime(options);
      });
    }
  },
  mounted () {
    this.startplay2()
    this.w = this.$el.offsetWidth * 3
    this.h = this.$el.offsetHeight
  }
}
</script>

<style scoped lang="scss">
  .shakingWater{
    position: relative;
    width: 5rem;height: 5rem;
    overflow: hidden;background-color: white;
    display: flex;align-items: center;justify-content: center;
    border-radius: 100%;
    box-shadow: 0 0 7px 0 #72e9e4;
    margin-top: 0.5rem;
    >.wave{
      position: absolute;
      bottom: 0;left: 0;
    }
    >.point{
      position: absolute;bottom: -20px;background-color: white;
      width:1rem;height: 1rem;border-radius: 100%;left: 0;
    }
    >.number{
      position: absolute;color: #007BD7;font-size: 1.5rem;font-weight: bold;
      opacity: .8;
    }
  }
</style>
