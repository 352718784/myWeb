<template>
    <div class="mainPage">
      <div class="id-card center">
        <img class="headImg" src="static/image/headImg.jpg">
        <p class="introduction">
          HI，欢迎访问我的个人网站。
        </p>
        <p>这个网站是我对这几年前端工作的一个总结。</p>
        <p>我将尝试工作中所<strong @click="$router.push({path: '/mainView/collectedQuestions'})">遇到的问题</strong>，<strong @click="$router.push({path: '/mainView/demoExample'})">开发的组件</strong>整理在这个上面，方便以后的工作使用。</p>
        <p>后续也会持续更新</p>
      </div>
      <div class="mail">
        <i class="ri-mail-line"></i>
        <strong>联系我</strong>
        <p>huangqq4319@163.com</p>
      </div>
      <div class="foot">
        <a v-for="item in webSite" :key="item.src" :href="item.src" target="_blank">{{item.name}}</a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'mainPage',
  data () {
    return {
      webSite: [
        {name: 'Vue', src: 'https://cn.vuejs.org/v2/guide/'},
        {name: 'Vuex', src: 'https://vuex.vuejs.org/zh/installation.html'},
        {name: 'VueRouter', src: 'https://router.vuejs.org/zh/'},
        {name: 'elementUI', src: 'https://element.eleme.cn/#/zh-CN/component/installation'},
        {name: 'remix', src: 'https://remixicon.cn'},
        {name: 'animeJs', src: 'https://www.animejs.cn/documentation/'},
        {name: '拟态', src: 'https://neumorphism.io/#55b9f3'},
        {name: 'axios', src: 'https://www.kancloud.cn/yunye/axios/234845'},
        {name: 'scss/sass', src: 'https://www.sass.hk/docs/'}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .mainPage{
    height: 100%;background-color: #d7d7d7;position: relative;
    >.id-card{
      width: 60%;height: 60%;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);
      border-radius: 1rem;background: #d7d7d7;box-shadow:  20px 20px 60px #b7b7b7, -20px -20px 60px #f7f7f7;
      flex-direction: column;
      >p{
        margin: .5rem 4rem;user-select: none;
        >strong{
          cursor: pointer;
        }
      }
    }
    .headImg{
      width: 10rem;height: 10rem;background-position: center;background-repeat: no-repeat;border-radius: 50%;
    }
    >.mail{
      position: absolute;right: 2rem;top: 2rem;
      background: #d7d7d7;font-size: .8rem;box-shadow:  12px 12px 24px #b7b7b7, -12px -12px 24px #f7f7f7;
      display: flex;padding: .7rem;border-radius: 10rem;align-items: center;justify-content: flex-start;
      width: 3.7rem;transition: width .5s;overflow: hidden;
      >i{margin-right: .5rem;cursor: pointer;user-select: none;}
      >strong{
        margin-right: 1rem;white-space: nowrap;cursor: pointer;user-select: none;
      }
      >p{
        margin: 0;opacity: 0;transition: opacity .5s;
      }
      &:hover{
        width: 14rem;
        &>p{
          opacity: 1;
        }
      }
    }
    >.foot{
      position: absolute;bottom: 2rem;width: 100%;text-align: center;padding: 1rem;
      >a{
        text-decoration-line: unset;padding: .7rem;margin: .5rem;border-radius: 10rem;
        background: #d7d7d7;box-shadow: inset 12px 12px 24px #b7b7b7, inset -12px -12px 24px #f7f7f7;
        transition: all .5s;color: $fontCol1;
        &:hover{
          background: linear-gradient(145deg, #e6e6e6, #c2c2c2);
          box-shadow:  12px 12px 24px #b7b7b7,
          -12px -12px 24px #f7f7f7;
        }
      }
    }
  }
</style>
