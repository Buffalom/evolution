class Tile {
  constructor (pos, size, meta) {
    this.pos = pos
    this.size = size
    Object.requiresProperties(meta, [
      { key: 'food', type: 'number', min: 0, max: 100 },
      { key: 'water', type: 'boolean' }
    ])
    this.meta = meta
  }

  get color () {
    let foodColor = color(
      map(this.meta.food, 0, 100, 20, 120),
      100,
      map(this.meta.food, 60, 100, 100, 50)
    )
    return this.meta.water ? color('blue') : foodColor
  }

  draw () {
    push()
    translate(this.pos.x, this.pos.y)
    noStroke()
    fill(this.color)
    rect(0, 0, this.size, this.size)
    pop()
  }

  // Generate JS-object with all information to replicate
  createJsObject () {
    return {
      pos: {
        x: this.pos.x,
        y: this.pos.y
      },
      size: this.size,
      meta: this.meta
    }
  }

  // Replicate from JS-object
  static fromJsObject (o) {
    Object.requiresProperties(o, [
      { key: 'pos', type: 'object' },
      { key: 'size', type: 'number', min: 1 },
      { key: 'meta', type: 'object' }
    ])
    Object.requiresProperties(o.pos, [
      { key: 'x', type: 'number' },
      { key: 'y', type: 'number' }
    ])
    return new this(createVector(o.pos.x, o.pos.y), o.size, o.meta)
  }
}