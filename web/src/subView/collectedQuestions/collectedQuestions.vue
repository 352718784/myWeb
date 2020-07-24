<template>
    <article class="collectedQuestions scroll0">
      <section>
        <h4>vue的一些性能优化技巧</h4>
        <p>1.合理的使用Object.freeze，通过改方法赋值的变量，vue不再对其进行数据响应，权衡使用</p>
        <p>2.再v-for循环中，避免v-if的判定，for优先if，再通过if来判断元素是否加载前，vue就已经循环过了，可以实现对需要循环的数据所filter筛选。
        而for优先if的原因，当我们使用render函数来实现v-for v-if的功能时，就可以很清晰的看到两者的优先级了<img src="static/image/202007132.png"> </p>
        <p>3.组件优化，合理的分配功能，使用多组件进行来组合页面，vue的视图更新是组件级更新，理论上组件内容越少，更新时重新生成的vnode越少，diff的速度也越快，提高更新效率。
        </p>
      </section>
      <section>
        <h4>错误：项目引入sass，dev运行异常，抛出异常</h4>
        <pre>
          * !!vue-style-loader!css-loader?{"minimize":false,"sourceMap":false}!../../node_modules/vue-loader/lib/style-compiler/index?{"vue":true,"id":"data-v-1d57e5ea","scoped":false,"hasInlineConfig":false}!stylus-loader?{"sourceMap":false}!../../node_modules/vue-loader/lib/selector?type=styles&index=0!./a.vue in ./src/components/a.vue
        </pre>
        <p>解决方法：确认sass-loader，node-loader，style-loader等依赖安装完成，确认全部安装完成后，检查sass版本，过高的版本
        也有可能引发上述问题，当前项目使用的sass-loader版本为<strong class="red">7.3.1</strong></p>
      </section>
      <section>
        <h4>vue项目中动态加载图片问题</h4>
        <p>需要通过require(相对路径)来解析图片，如果直接通过变量设置路径并绑定到img src 属性上，webpack会将其解析成字符串，打包后会出现指向错误路径，因为打包时项目的目录结构发生了变化</p>
      </section>
      <section>
        <h4>项目中如何定义scss全局变量</h4>
        <p>build/utils.js 中，修改为</p> <pre>
        scss: generateLoaders('sass').concat(
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, '../src/assets/vars.scss')
            }
          }
        ),
      </pre>
      </section>
      <section>
        <h4>通过keep-alive 包裹的组件如何进行强制刷新</h4>
        <p>1.组件被keep-alive包裹，进行组件切换时，会触发activated和deactivated两个钩子，前者
        为组件激活时触发，后者组件失活时触发，可以在deactivated，运行$destroy方法，销毁失活组件，这样在次进来后
        组件会进行重新渲染，created mount等钩子函数会重新触发</p>
        <p>2.利用key，vue 通过key来判断更新前后当前节点是否是同一个节点，这个也涉及到了diff算法。当组件绑定的key值发生改变时，通过diff算法
        判断，将使用新节点来替换旧节点，从而达到组件强制更新的效果，同样在这个过程中，组件同样会触发created mounted等钩子函数，通过测试，可以发现
        他的一个顺序 beforeCreate - created - beforeMount - beforeDestroy - destroyed - mounted，可以看出组件的销毁时在组件开始挂载之后，
        完成挂载之前</p>
        <p>另外对于在v-for中是否需要添加key值，可以参考如下文章<a href="https://segmentfault.com/a/1190000020716723">https://segmentfault.com/a/1190000020716723</a></p>
        <p>在简单情况下，不加key确实可以调高一定的加载效率，不过这种效率对于用户来说微乎其微，并且也不利于复杂情况的下页面开发，最好还是使用key，另外对于使用index来作为key值的用法，index作为key
        和不设置key效果是一样的，列表项index不会变化，并且使用index还会一起更新上的问题，比如降低页面更新的效率，在transition-group中引起错误的动画序列</p>
      </section>
      <section>
        <h4>vue 中的 Filter</h4>
        <p>Filter只能用来处理传入参数的修改，相比computed，他更简洁，降低页面加载时的负荷，但同时使用场景收到限制，例如无法使用this，或者说他的this不指向当前组件实例</p>
      </section>
      <section>
        <h4>ES6 中的Map 的一些基本用法</h4>
        <img src="static/image/20200712135020.png">
      </section>
      <section>
        <h4>vue中的remove</h4>
        <p>vue 1.X中的$remove 已经移除，直接通过htmlElement（this.$el）中的remove方法，同样也可以再次添加上去，好像没啥用啊，不会触发生命周期的钩子</p>
        <img src="static/image/20200712150702.png">
      </section>
      <section>
        <h4>vue中的$mount 和 $destroyed</h4>
        <p>需要注意的是，$destroyed是不会自动清除页面元素的，还是要通过remove来手动清除，用这个方法同样可以进行组件的强制的刷新</p>
        <el-image
          src="static/image/202007123.png">
        </el-image>
        <div>
          <el-image style="width: 100px; height: 100px"
            src="static/image/xzz.jpg">
          </el-image>
          <p><small>（要刷新组件何必这么麻烦，直接使用修改绑定的key值来进行组件的强制刷新</small></p>
        </div>
      </section>
      <section>
        <h4>vue 的生命周期</h4>
        <el-image
          style="width: 120px; height: 304px"
          src="static/image/lifecycle.png" :preview-src-list="['static/image/lifecycle.png']">
        </el-image>
        <p>另外再父子组件中，子组件的生命周期迟于父组件开始，先于父组件结束，根据demo测试，其顺序应该是 父beforeMount =》 子beforeCreate =》 …………=》子mounted =》父mounted</p>
        <p>随后我之后继续测试了update，destory的执行顺序，子组件生命周期均在再父组件的生命周期之间</p>
        <p>但是，父组件通过子组件插槽插入的部分，目前暂时还不是很清除他的更新是随父组件还是子组件的</p>
      </section>
      <section>
        <h4>关于vue中style的scoped，其实现原理以及优缺点</h4>
        <a href="https://vue-loader.vuejs.org/zh/guide/scoped-css.html">https://vue-loader.vuejs.org/zh/guide/scoped-css.html</a>
        <p>
          <el-image src="static/image/202007131.png"></el-image>
        </p>
        <p>通过上图可以理解vue是如何实现样式组件内样式私有的，但这种方式同样会大大增加浏览器的性能消耗，需要选择性的使用</p>
      </section>
    </article>
</template>

<script>
import Demo from '../../components/demo'
import Vue from 'vue'
import collectedQuestions from '../collectedQuestions/collectedQuestions'
export default {
  name: 'collectedQuestions',
  components: {Demo},
  data () {
    return {
      name: 'collectedQuestions',
      key: 1
    }
  },
  methods: {
  },
  destroyed () {
    console.log('destroyed')
    this.$createElement([1, 2, 3].map(a => a !== 2 ? this.$createElement('span', a) : null))
  },
  mounted () {
    console.log(this.$el.scrollHeight)
    this.$el.scrollTo(0, 5000)
  }
}
</script>

<style scoped lang="scss">
  .collectedQuestions {
    padding: .5rem;font-size: .8rem;
    box-sizing: border-box;height: 100%;color: $fontCol1;
    counter-reset: section;
  }
  h4{
    margin: .5rem 0;
  }
  img{
    border-radius: .5rem;
  }
  section{
    padding: .5rem;
    >h4:first-child{
      &:before{
        content: counter(section) '、';
        counter-increment: section;
        display: inline-block;
      }
    }
    &:nth-child(2n){
      background-color: $grey4;padding: .5rem;border-radius: .2rem;
    }
  }
</style>
