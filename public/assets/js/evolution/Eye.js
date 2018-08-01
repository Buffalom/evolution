class Eye {
  constructor (relPos, size) {
    this.relPos = relPos
    this.size = size
  }

  draw () {
    fill(0)
    stroke(0)
    ellipse(this.relPos.x, this.relPos.y, this.size)
    line(0, 0, this.relPos.x, this.relPos.y)
  }
}