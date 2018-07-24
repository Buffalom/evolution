class Eye {
  constructor (size, x, y, options) {
    this.size = size
    this.relPos = createVector(x, y)
    this.options = options || {}
  }

  hueSeen (animalPos) {
    let absoluteEyePos = this.relPos.add(animalPos)
    let rgba = get(absoluteEyePos.x, absoluteEyePos.y)
    let seenColor = color(rgba[0], rgba[1], rgba[2], rgba[3])
    return hue(seenColor)
  }

  draw (animalPos) {
    let lookPos = this.relPos.setMag(this.relPos.mag() + this.size)
    console.log(this.relPos, lookPos)
    let absoluteEyePos = lookPos.add(animalPos)
    push()
    fill(0)
    stroke(0)
    ellipse(absoluteEyePos.x, absoluteEyePos.y, this.size)
    line(animalPos.x, animalPos.y, absoluteEyePos.x, absoluteEyePos.y)
    pop()
  }
}