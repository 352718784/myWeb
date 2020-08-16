const commMet = {
  * traversalTree (tree) {
    console.log(this)
    debugger
    for (let i of tree) {
      yield i
      if (i.children && i.children.length) {
        yield * this.traversalTree(i.children)
      }
    }
  }
}
export default commMet
