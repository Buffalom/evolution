class Eye {
  constructor (size, x, y, options) {
    this.size = size
    this.relPos = createVector(x, y)
    this.options = options || {}
  }

  hueSeen () {
    let rgba = get(this.relPos.x, this.relPos.y)
    let seenColor = color(rgba[0], rgba[1], rgba[2], rgba[3])
    return hue(seenColor)
  }

  draw () {
    fill(0)
    stroke(0)
    ellipse(this.relPos.x, this.relPos.y, this.size)
    line(0, 0, this.relPos.x, this.relPos.y)
  }
}