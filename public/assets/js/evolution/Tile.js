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
      map(this.meta.food, 50, 80, 255, 0),
      this.meta.food <= 50 ? map(this.meta.food, 0, 50, 100, 255) : map(this.meta.food, 80, 100, 255, 100),
      0
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
}