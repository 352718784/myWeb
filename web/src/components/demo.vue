<template>
    <div class="demo">
      <el-button @click="test">test</el-button>
    </div>
</template>

<script>
import demoMixin from './demoMixin'
import comm from '../common/comm'
import commMet from '../common/commMet'
import vue from 'vue'
import 'kar'
import HoverEffect from './hoverEffect/hoverEffect'
export default {
  name: 'demo',
  components: {HoverEffect},
  mixins: [demoMixin],
  data () {
    return {
      msg: 'hello, zr',
      obj: {time: ''}
    }
  },
  computed: {
    newMsg () {
      return this.msg + 'new'
    }
  },
  methods: {
    test () {
      commMet.traversalTree([{id: 1, children: [{id: 2}]}])
      for (let i of commMet.traversalTree([{id: 1, children: [{id: 2}]}])) {
        console.log(i)
      }
    }
  },
  destroyed () {
  },
  mounted () {
  }
}
</script>
