class Animal {
  constructor (size, x, y, options) {
    this.size = size
    this.pos = createVector(x, y)
    this.options = options || {}

    // Init eyes
    this.eyes = []
    let eye = new Eye(0, 0)
    this.eyes[0] = eye
    console.log(this.hueSeenByEye(0))
  }

  draw () {
    push()
    fill(150)
    stroke(0)
    ellipse(this.pos.x, this.pos.y, this.size)
    pop()
  }

  hueSeenByEye (eyeIndex) {
    let eye = this.eyes[eyeIndex]
    return eye.hueSeen(this.pos)
  }
}