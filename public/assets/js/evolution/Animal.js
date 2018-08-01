class Animal {
  constructor (pos, size, meta) {
    Object.requiresProperties(pos, [
      { key: 'x', type: 'number', min: 0 },
      { key: 'y', type: 'number', min: 0 }
    ])
    this.pos = pos
    this.size = size
    Object.requiresProperties(meta, [
      { key: 'health', type: 'number', min: 0, max: 100 }
    ])
    this.meta = meta
  }

  initEyes () {

  }

  get color () {
    return color(this.meta.health)
  }

  draw () {
    push()
    translate(this.pos.x, this.pos.y)
    stroke(0)
    fill(this.color)
    ellipse(0, 0, this.size)
    fill(this.color)
    ellipse(this.size * 0.4, 0, this.size * 0.5)
    pop()
  }
  
  // Generate JS-object with all information to replicate
  createJsObject () {
    return {
      pos: {
        x: this.pos.x,
        y: this.pos.y
      },
      // vel: {
      //   x: this.vel.x,
      //   y: this.vel.y
      // },
      // acc: {
      //   x: this.acc.x,
      //   y: this.acc.y
      // },
      size: this.size,
      meta: this.meta
    }
  }

  // Replicate from JS-object
  static fromJsObject (o) {
    Object.requiresProperties(o, [
      { key: 'pos', type: 'object' },
      // { key: 'vel', type: 'object' },
      // { key: 'acc', type: 'object' },
      { key: 'size', type: 'number', min: 1 },
      { key: 'meta', type: 'object' }
    ])
    let newAnimal = new this(o.pos, o.size, o.meta)
    newAnimal.initEyes()
    return newAnimal
  }
}