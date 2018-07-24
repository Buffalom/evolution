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
    let foodColor = color(
      map(this.meta.food, 50, 80, 255, 0),
      this.meta.food <= 50 ? map(this.meta.food, 0, 50, 100, 255) : map(this.meta.food, 80, 100, 255, 100),
      0
    )
    
    push()
    fill(this.meta.water ? 'blue' : foodColor)
    rect(this.pos.x, this.pos.y, this.width, this.height)
    fill(0)
    if (this.meta.food) {
      textSize(12)
      text(this.meta.food, this.pos.x, this.pos.y, this.width, this.height)
    }
    pop()
  }
}