<template>
    <div>
      {{msg}}
      <button @click="test">hello hsq</button>
    </div>
</template>

<script>
import demoMixin from './demoMixin'
export default {
  name: 'demo',
  mixins: [demoMixin],
  data () {
    return {
      msg: 'hello, zr'
    }
  },
  methods: {
    test () {
      console.log(this.name)
    }
  }
}
</script>

<style scoped>

</style>
