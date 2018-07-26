class Animal {
  constructor (size, x, y, options) {
    // Possible options: eyeCount, fieldOfVision, visualRange
    this.options = options || {}
    this.size = size
    this.pos = createVector(x, y)

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
    translate(this.pos.x, this.pos.y)
    // Draw eyes
    if (debug) {
      this.eyes.forEach((eye, index) => {
        eye.draw()
      })
    }
    fill(150)
    stroke(0)
    ellipse(0, 0, this.size)
    ellipse(this.size / 2 * 0.8, 0, this.size / 2)
    pop()
  }

  hueSeenByEye (eyeIndex) {
    let eyePos = this.absoluteEyePos(eyeIndex)
    return hue(get(eyePos.x, eyePos.y))
  }

  absoluteEyePos (eyeIndex) {
    return p5.Vector.add(this.pos, this.eyes[eyeIndex].relPos)
  }
}