class Tile {
  constructor (size, x, y, meta) {
    this.width = size
    this.height = size
    this.pos = createVector(x, y)

    if (typeof meta !== 'object') throw new Error('Tile meta must be of type object')
    this.meta = {}
    this.meta.water = Boolean(meta.water)
    if (typeof meta.food !== 'number' || meta.food < 0 || meta.food > 100) throw new Error('Tile meta "food" must be of type number and between 0 and 100')
    this.meta.food = meta.water ? 0 : meta.food
  }

  draw () {
    push()
    fill(this.color)
    stroke(this.color)
    rect(this.pos.x, this.pos.y, this.width, this.height)
    if (!this.meta.water) {
      fill(0)
      textSize(12)
      text(this.meta.food, this.pos.x, this.pos.y, this.width, this.height)
    }
    pop()
  }

  get color () {
    let foodColor = color(
      map(this.meta.food, 50, 80, 255, 0),
      this.meta.food <= 50 ? map(this.meta.food, 0, 50, 100, 255) : map(this.meta.food, 80, 100, 255, 100),
      0
    )
    return this.meta.water ? color('blue') : foodColor
  }
}