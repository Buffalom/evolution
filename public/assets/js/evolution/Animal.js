class Animal {
  constructor (pos, vel, acc, size, meta, options) {
    Object.requiresProperties(pos, [
      { key: 'x', type: 'number', min: 0 },
      { key: 'y', type: 'number', min: 0 }
    ])
    this.pos = pos
    this.vel = vel
    this.acc = acc
    this.size = size
    Object.requiresProperties(meta, [
      { key: 'health', type: 'number', min: 0, max: 100 }
    ])
    this.meta = meta
    Object.requiresProperties(options, [
      { key: 'eyeCount', type: 'number', min: 1, max: 10 },
      { key: 'fieldOfVision', type: 'number', min: 1, max: 340 },
      { key: 'visualRange', type: 'number', min: 1 },
      { key: 'maxSpeed', type: 'number' },
      { key: 'maxForce', type: 'number' }
    ], true)
    this.options = options

    this.initEyes()
  }

  initEyes () {
    let eyeCount = this.options.eyeCount
    this.eyes = []
    this.eyes[0] = new Eye(createVector(0, 0), this.size * 0.2)
    eyeCount--
    if (eyeCount === 1) {
      this.eyes[1] = new Eye(createVector(this.options.visualRange, 0), this.size * 0.2)
    } else {
      for (let i = 0; i < eyeCount; i++) {
        let eyeGap = this.options.fieldOfVision / (eyeCount - 1)
        let pos = p5.Vector.fromAngle(radians(this.options.fieldOfVision * -0.5 + eyeGap * i)).setMag(this.options.visualRange)
        this.eyes[i + 1] = new Eye(pos, this.size * 0.2)
      }
    }
  }

  get color () {
    return color(this.meta.health)
  }

  setTarget (target) {
    this.currTarget = target
  }

  target (target) {
    let desiredVel = p5.Vector.sub(p5.Vector.sub(target, this.pos)).setMag(this.options.maxSpeed)
    let steering = p5.Vector.sub(desiredVel, this.vel).limit(this.options.maxForce)
    this.applyForce(steering)
  }

  applyForce (force) {
    this.vel.add(force)
  }

  update () {
    this.target(this.currTarget || this.pos)
    this.vel.add(this.acc)
    this.pos.add(this.vel)
  }

  draw () {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading())
    stroke(0)
    fill(this.color)
    ellipse(0, 0, this.size)
    fill(this.color)
    ellipse(this.size * 0.4, 0, this.size * 0.5)
    this.eyes.forEach(eye => {
      eye.draw()
    })
    if (DEBUG) drawArrow(createVector(0, 0), this.vel, 'green')
    pop()
  }
  
  // Generate JS-object with all information to replicate
  createJsObject () {
    return {
      pos: {
        x: this.pos.x,
        y: this.pos.y
      },
      vel: {
        x: this.vel.x,
        y: this.vel.y
      },
      acc: {
        x: this.acc.x,
        y: this.acc.y
      },
      size: this.size,
      meta: this.meta,
      options: this.options
    }
  }

  // Replicate from JS-object
  static fromJsObject (o) {
    Object.requiresProperties(o, [
      { key: 'pos', type: 'object' },
      { key: 'vel', type: 'object' },
      { key: 'acc', type: 'object' },
      { key: 'size', type: 'number', min: 1 },
      { key: 'meta', type: 'object' },
      { key: 'options', type: 'object' }
    ])
    let newAnimal = new this(o.pos, o.vel, o.acc, o.size, o.meta, o.options)
    return newAnimal
  }
}