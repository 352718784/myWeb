class Draw {
  constructor (cav, w, h, a1, a2) {
    this.cav = cav
    this.w = w
    this.h = h
    this.a1 = a1 // 设置四角内折
    this.a2 = a2 // 为线条阴影留出空间
    cav.width = w; cav.height = h // 设置传入的canvas元素的宽高
    this.cxt = cav.getContext('2d')
    // 计算边框中的折点
    this.p = [
      [a2, a1 + a2],
      [a1 + a2, a2],
      [w - a1 - a2, a2],
      [w - a2, a1 + a2],
      [w - a2, h - a1 - a2],
      [w - a1 - a2, h - a2],
      [a1 + a2, h - a2],
      [a2, h - a1 - a2]
    ]
    this.cxt.clearRect(0, 0, w, h)
  }
  // 设置线条，内部设置参数，通过解构使新参数和默认参数混合，方便调用，不限制参数对象的数据格式
  setBorder (args = {}) {
    let defaultArgs = {
      width: 1, color: '#F2F6FC'
    }
    defaultArgs = {...defaultArgs, ...args}
    this.cxt.lineWidth = defaultArgs.width; this.cxt.strokeStyle = defaultArgs.color
  }
  // 设置边框，同样使用了解构来进行混合
  setBoxShadow (args = {}) {
    let defaultArgs = {
      x: 0, y: 0, color: 'rgba(0, 0, 0, 0.1)', blur: this.a2
    }
    defaultArgs = {...defaultArgs, ...args}
    this.cxt.shadowColor = defaultArgs.color; this.cxt.shadowBlur = defaultArgs.blur
    this.cxt.shadowOffsetX = defaultArgs.x; this.cxt.shadowOffsetY = defaultArgs.y
  }
  // 开始绘制边框，并填充边框区域中的颜色
  drawBorder () {
    this.cxt.beginPath()
    this.cxt.fillStyle = 'white'; this.cxt.lineJoin = 'round'
    for (let i = 0; i < this.p.length; i++) {
      if (i === 0) this.cxt.moveTo(this.p[i][0], this.p[i][1])
      else this.cxt.lineTo(this.p[i][0], this.p[i][1])
    }
    // 需要注意的是，先进行stroke 再 进行 fill，可以避免阴影图层在填充图层上面，防止阴影向内侵入
    this.cxt.stroke(); this.cxt.fill()
  }
  // 绘制边框中的四个角，同样，需要再调用时先调用setBorder来进行线条设置
  // 绘制顺序为 左上 右上 右下 左下
  drawQuadrangle () {
    let cxt = this.cxt; let p = this.p; let arg = this.a1 * 1.6
    cxt.beginPath()
    cxt.moveTo(p[0][0], p[0][1] + arg)
    cxt.lineTo(p[0][0], p[0][1])
    cxt.lineTo(p[1][0], p[1][1])
    cxt.lineTo(p[1][0] + arg, p[1][1])
    cxt.moveTo(p[2][0] - arg, p[2][1])
    cxt.lineTo(p[2][0], p[2][1])
    cxt.lineTo(p[3][0], p[3][1])
    cxt.lineTo(p[3][0], p[3][1] + arg)
    cxt.moveTo(p[4][0], p[4][1] - arg)
    cxt.lineTo(p[4][0], p[4][1])
    cxt.lineTo(p[5][0], p[5][1])
    cxt.lineTo(p[5][0] - arg, p[5][1])
    cxt.moveTo(p[6][0] + arg, p[6][1])
    cxt.lineTo(p[6][0], p[6][1])
    cxt.lineTo(p[7][0], p[7][1])
    cxt.lineTo(p[7][0], p[7][1] - arg)
    cxt.stroke()
  }
}
export default Draw
