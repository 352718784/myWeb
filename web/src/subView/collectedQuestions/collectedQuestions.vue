<template>
    <article class="collectedQuestions scroll0">
      <section>
        <h4>generator函数的一些使用场景</h4>
        <p>1.id生成器<img src="static/image/8121.png"/>，实例idCreate后，每执行一次next()，返回一个新的id</p>
        <p>2.遍历树<img src="static/image/8122.png"/>，将树型数据（数组对象）传入后，可以使用for of 对实例对象进行遍历，相比于使用回调来的更加优雅，控制方便，代码简洁</p>
      </section>
      <section>
        <h4>let const var的区别</h4>
        <p>let const 是es6引入的标准，都是块级作用域，在代码中通过{}来体现，离开块级作用域后，let const 将无法被访问到。
        然而var并不关注块级作用域，他是在距离最近的函数内或者全局词法环境内注册，这也是为什么在for循环中声明了一个var，确可以在循环外被访问到，而在函数内声明了一个var 却无法在函数外
        被访问到</p>
        <p><strong>引申问题:</strong>为什么在函数内可以访问到外部定义的变量？</p>
        <p>跟踪外部词法环境，事实上函数在被定义的时候，无论是否被执行，都会存储外部词法环境在其内部属性中，例如在全局环境中定义的函数会存储全局此法环境，在函数内被定义的函数会存储外部函数的词法环境，
        当函数内需要访问一个未被定义的变量时，会去外部环境寻找该变量，直至全局环境</p>
      </section>
      <section>
        <h4>为什么需要使用$set</h4>
        <p>vue组件在初始化过程中，需要对data中的数据进行遍历监听，当我们定义了一个对象obj:{a: 'hello'}，并在模板中使用了<span v-text="'{{obj}}'"></span>来进行展示，修改obj.a可以触发页面更新，但执行
        obj.b = 'world'时，并不会触发页面更新，因为组件在初始化时并没有对b属性进行set，get劫持，这时就需要$set方法手动通知组件对b属性也进行监听，设置监听后，再执行 obj.b = 'world'时就可以相应到页面中了
        当然也可以再$set时事件对属性进行赋值，理论上只需要执行一次$set即可</p>
      </section>
      <section>
        <h4>如何不适用deep属性的情况下watch对象，以及移除watch对象</h4>
        <p><img src="static/image/881.png">创建监听目标对象</p>
        <p><img src="static/image/882.png">创建事件，通过页面手动修改目标对象属性</p>
        <p><img src="static/image/883.png">$watch方法会放回一个对象方法，可以用于移除监听，实现目标对象只监听一次的功能，另外需要注意的时，我们通过组件实例方法$watch
        来监听对象时，需要在destroyed钩子中手动移除监听方法，否则会出现内存溢出的问题。因为传入的回调方法是存储在全局中的，如果说使用组件watch选项进行监听，组件实例销毁时会自动销毁调，而使用$watch则不会</p>
      </section>
      <section>
        <h4>箭头函数再对象字面量和函数字面量中的指向</h4>
        <p></p>
        <p>箭头函数的this与声明所在的上下文相同，例如我们再构建函数中出使用了箭头函数，不会隐士传入this，而是从定义时的函数继承上下文，并且再创建时就确定了this值，所以无论如何箭头函数的this都指向通过构建函数创建的对象</p>
        <p>但这样也会造成一其他的问题，再对象字面量中定义箭头函数为某个属性，this却没有指向该对象，因为对象字面量是再更外一层（例如window）中被定义，所以this会指向更外层（window）</p>
        <p>这也是为什么再vue中，我们的methods中所定义的属性方法均使用普通函数</p>
        <p>引申问题，call apply bind（es6新增）可以手动绑定this</p>
      </section>
      <section>
        <h4> == 于 ====</h4>
        <p>== 再进行比较的时候，会去转换左右两边的数据类型</p>
        <ol>
          <li>对象 == 对象 比较对象地址</li>
          <li>对象 == 字符串，object.toString() 后再进行比较</li>
          <li>NaN == NaN 再如何情况下都不等于，NaN属性是代表非数字值的特殊值，该属性用于指示某个值不是数字，可以使用isNaN()或者Object.is()方法来判断</li>
          <li>null == undefined ==下等于，===不等于</li>
          <li>其他情况，左右转换为数字进行比较</li>
        </ol>
        <p><strong>引申问题</strong>，Object.is()于 ==/===不同的是，前者的不会去转换对象类型，<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is" target="_blank">MDN详细介绍</a>
        </p>
        <p>
          相等条件，都是 undefined 都是 null 都是 true 或 false 都是相同长度的字符串且相同字符按相同顺序排列 都是相同对象（意味着每个对象有同一个引用） 都是数字且 都是-0 或者都是 +0 或者都是 NaN 或都是非零而且非 NaN 且为同一个值
        </p>
      </section>
      <section>
        <h4>合理使用weakMap防止内存溢出</h4>
      </section>
      <section>
        <h4>箭头函数和普通函数</h4>
        <p>箭头函数他没有自己的this，他会捕获上下文，吧上下文的this作为自己的，也没有 prototype，他还是匿名函数，也就意味着不能用new，他也没有arguments，不过可以用扩展运算符来代替</p>
      </section>
      <section>
        <h4>undefined 和 null 的区别</h4>
        <p>null：代表“空值”，代表一个空对象指针，使用typeof返回结果是object，可以将变量执行null，断开变量和对象的联系，浏览器将会自动回收内存</p>
        <p>undefined：当一个声明了一个变量未初始化时，得到的就是undefined</p>
      </section>
      <section>
        <h4>前端进阶知识</h4>
        <a href=" https://juejin.im/post/5e3ffc85518825494e2772fd" target="_blank">点我前往</a>
      </section>
      <section>
        <h4>vue的一些性能优化技巧</h4>
        <p>1.合理的使用Object.freeze，通过改方法赋值的变量，vue不再对其进行数据响应，权衡使用</p>
        <p>2.再v-for循环中，避免v-if的判定，for优先if，再通过if来判断元素是否加载前，vue就已经循环过了，可以实现对需要循环的数据所filter筛选。
        而for优先if的原因，当我们使用render函数来实现v-for v-if的功能时，就可以很清晰的看到两者的优先级了<img src="static/image/202007132.png"> </p>
        <p>3.组件优化，合理的分配功能，使用多组件进行来组合页面，vue的视图更新是组件级更新，理论上组件内容越少，更新时重新生成的vnode越少，diff的速度也越快，提高更新效率。</p>
        <p>4.尽可能的使用compute而不是watch，如果需要监听某个数据并进行高消耗任务时，使用watch来的更适合，watch深度监听可以使用object.attribute字符串的方式来进行减少性能消耗，在不需要watch的在组件内注销掉</p>
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
  },
  mounted () {
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
