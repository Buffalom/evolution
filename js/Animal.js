class Animal {
  constructor (size, x, y, options) {
    this.size = size
    this.pos = createVector(x, y)
    this.options = options || {}

    // Init eyes
    this.eyes = []
    let eye = new Eye(this.size * 0.2, 0, 0)
    this.eyes[0] = eye
    let eyeGap = this.options.fieldOfVision / ((this.options.eyeCount - 1) > 0 ? this.options.eyeCount - 1 : 0)
    if (this.options.eyeCount === 1) {
      let vec = p5.Vector.fromAngle(radians(0), this.options.visualRange || 50)
      let eye = new Eye(this.size * 0.3, vec.x, vec.y)
      this.eyes[1] = eye
    } else if (this.options.eyeCount > 1) {
      for (let eyeIndex = 0; eyeIndex < this.options.eyeCount; eyeIndex++) {
        let vec = p5.Vector.fromAngle(radians(this.options.fieldOfVision / -2 + eyeIndex * eyeGap), this.options.visualRange || 50)
        let eye = new Eye(this.size * 0.3, vec.x, vec.y)
        this.eyes[eyeIndex + 1] = eye
      }
    }
  }

  draw () {
    push()
    fill(150)
    stroke(0)
    ellipse(this.pos.x, this.pos.y, this.size)
    // Draw eyes
    this.eyes.forEach((eye, index) => {
      eye.draw(this.pos)
      console.log(`Eye ${index}:`, this.hueSeenByEye(index))
    })
    pop()
  }

  hueSeenByEye (eyeIndex) {
    let eye = this.eyes[eyeIndex]
    return eye.hueSeen(this.pos)
  }
}